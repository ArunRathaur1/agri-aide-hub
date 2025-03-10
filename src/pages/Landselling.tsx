"use client"; // Required for Next.js if using Client Components

import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Plus, ExternalLink, Tag } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";

// Define a type for land listings
interface LandListing {
  id: string;
  title: string;
  description: string;
  price: number;
  area: number;
  location: [number, number]; // [latitude, longitude]
}

export default function Landselling() {
  const [activeTab, setActiveTab] = useState("map");
  const mainMapRef = useRef<L.Map | null>(null);
  const locationMapRef = useRef<L.Map | null>(null);
  const mainMapContainerRef = useRef<HTMLDivElement>(null);
  const locationMapContainerRef = useRef<HTMLDivElement>(null);
  const locationMarkerRef = useRef<L.Marker | null>(null);
  const [listings, setListings] = useState<LandListing[]>([]);
  const [newListing, setNewListing] = useState<Omit<LandListing, "id">>({
    title: "",
    description: "",
    price: 0,
    area: 0,
    location: [20.5937, 78.9629], // Default to India's center
  });
  const { toast } = useToast();
  const [isMainMapInitialized, setIsMainMapInitialized] = useState(false);
  const [isLocationMapInitialized, setIsLocationMapInitialized] =
    useState(false);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);

    // Use setTimeout to ensure the tab content is rendered before attempting to initialize maps
    setTimeout(() => {
      if (value === "map" && mainMapRef.current) {
        mainMapRef.current.invalidateSize();
        updateMainMapMarkers();
      } else if (value === "add" && locationMapRef.current) {
        locationMapRef.current.invalidateSize();
        updateLocationMarker();
      }
    }, 100);
  };

  // Initialize the main map (once)
  useEffect(() => {
    if (isMainMapInitialized || !mainMapContainerRef.current) return;

    const mapInstance = L.map(mainMapContainerRef.current).setView(
      [20.5937, 78.9629],
      5
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    mainMapRef.current = mapInstance;
    setIsMainMapInitialized(true);

    return () => {
      if (mainMapRef.current) {
        mainMapRef.current.remove();
        mainMapRef.current = null;
        setIsMainMapInitialized(false);
      }
    };
  }, [mainMapContainerRef.current]);

  // Initialize the location selection map (once)
  useEffect(() => {
    if (isLocationMapInitialized || !locationMapContainerRef.current) return;

    const mapInstance = L.map(locationMapContainerRef.current).setView(
      newListing.location,
      5
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    // Add initial marker
    locationMarkerRef.current = L.marker(newListing.location).addTo(
      mapInstance
    );

    // Handle location map clicks
    mapInstance.on("click", (e) => {
      const { lat, lng } = e.latlng;
      setNewListing((prev) => ({ ...prev, location: [lat, lng] }));
    });

    locationMapRef.current = mapInstance;
    setIsLocationMapInitialized(true);

    return () => {
      if (locationMapRef.current) {
        locationMapRef.current.remove();
        locationMapRef.current = null;
        setIsLocationMapInitialized(false);
      }
    };
  }, [locationMapContainerRef.current]);

  // Effect to handle visible tab resizing
  useEffect(() => {
    if (activeTab === "map" && mainMapRef.current) {
      mainMapRef.current.invalidateSize();
      updateMainMapMarkers();
    } else if (activeTab === "add" && locationMapRef.current) {
      locationMapRef.current.invalidateSize();
      updateLocationMarker();
    }
  }, [activeTab]);

  // Update location marker when coordinates change
  useEffect(() => {
    updateLocationMarker();
  }, [newListing.location]);

  // Update main map markers when listings change
  useEffect(() => {
    updateMainMapMarkers();
  }, [listings]);

  // Function to update the location marker
  const updateLocationMarker = () => {
    if (!locationMapRef.current || !locationMarkerRef.current) return;

    locationMarkerRef.current.setLatLng(newListing.location);
    locationMapRef.current.setView(
      newListing.location,
      locationMapRef.current.getZoom()
    );
  };

  // Function to update markers on the main map
  const updateMainMapMarkers = () => {
    if (!mainMapRef.current) return;

    // Clear existing markers
    mainMapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mainMapRef.current?.removeLayer(layer);
      }
    });

    // Add markers for each listing
    listings.forEach((listing) => {
      const googleMapsUrl = getGoogleMapsUrl(listing.location);

      L.marker(listing.location)
        .addTo(mainMapRef.current!)
        .bindPopup(
          `
          <strong>${listing.title}</strong><br>
          Price: ₹${listing.price.toLocaleString()}<br>
          Area: ${listing.area} acres<br>
          <a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer">View on Google Maps</a>
        `
        )
        .on("click", () => {
          mainMapRef.current?.setView(listing.location, 12);
        });
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewListing((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "area" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleAddListing = () => {
    if (!newListing.title || newListing.price <= 0 || newListing.area <= 0) {
      toast({
        title: "Invalid listing",
        description: "Please fill all required fields with valid values.",
        variant: "destructive",
      });
      return;
    }

    const newItem: LandListing = {
      id: Date.now().toString(),
      ...newListing,
    };

    setListings((prev) => [...prev, newItem]);

    // Reset form
    setNewListing({
      title: "",
      description: "",
      price: 0,
      area: 0,
      location: [20.5937, 78.9629],
    });

    toast({
      title: "Listing added",
      description: "Your land listing has been added successfully.",
    });

    // Switch to map view and center on the new listing
    handleTabChange("map");

    // Focus on the new listing on the map
    if (mainMapRef.current) {
      setTimeout(() => {
        mainMapRef.current?.setView(newItem.location, 12);
      }, 200);
    }
  };

  // Function to get Google Maps URL for coordinates
  const getGoogleMapsUrl = (coords: [number, number]): string => {
    return `https://www.google.com/maps?q=${coords[0]},${coords[1]}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Agricultural Land Marketplace
        </h1>

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="add">Add Listing</TabsTrigger>
          </TabsList>

          <TabsContent
            value="map"
            className="space-y-4"
            forceMount={activeTab === "map"}
          >
            <Card className={activeTab !== "map" ? "hidden" : ""}>
              <CardHeader>
                <CardTitle>Land Listings Map</CardTitle>
                <CardDescription>
                  Browse available agricultural land for sale. Click on markers
                  to view details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Map container with fixed height */}
                <div
                  ref={mainMapContainerRef}
                  className="h-96 w-full rounded-md border"
                  style={{ display: activeTab === "map" ? "block" : "none" }}
                ></div>
              </CardContent>
              <CardFooter className="bg-muted/30">
                <div className="w-full">
                  <p className="text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    {listings.length} listing{listings.length !== 1 ? "s" : ""}{" "}
                    available
                  </p>
                  {listings.length > 0 && (
                    <div className="mt-2 space-y-2">
                      <p className="text-sm font-medium">Recent Listings:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {listings.slice(-3).map((listing) => (
                          <Button
                            key={listing.id}
                            variant="outline"
                            className="h-auto py-2 justify-start text-left"
                            onClick={() => {
                              if (mainMapRef.current)
                                mainMapRef.current.setView(
                                  listing.location,
                                  12
                                );
                            }}
                          >
                            <div className="w-full flex justify-between items-center">
                              <div>
                                <p className="font-medium truncate">
                                  {listing.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  ₹{listing.price.toLocaleString()} •{" "}
                                  {listing.area} acres
                                </p>
                              </div>
                              <a
                                href={getGoogleMapsUrl(listing.location)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-700"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent
            value="add"
            className="space-y-4"
            forceMount={activeTab === "add"}
          >
            <Card className={activeTab !== "add" ? "hidden" : ""}>
              <CardHeader>
                <CardTitle>Add New Land Listing</CardTitle>
                <CardDescription>
                  Fill in the details below to list your agricultural land for
                  sale
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Listing Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Fertile Farmland near Pune"
                    value={newListing.title}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your land, soil quality, nearby water sources, etc."
                    rows={4}
                    value={newListing.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="Enter price in rupees"
                      value={newListing.price || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Area (acres)</Label>
                    <Input
                      id="area"
                      name="area"
                      type="number"
                      placeholder="Land area in acres"
                      value={newListing.area || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-sm mb-2 font-medium">Location</p>
                  <div className="border rounded-md p-3 bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-1">
                      Click on the map to set the location, or enter coordinates
                      manually:
                    </p>

                    {/* Location selection map */}
                    <div
                      ref={locationMapContainerRef}
                      className="h-40 w-full mb-3 rounded border"
                      style={{
                        display: activeTab === "add" ? "block" : "none",
                      }}
                    ></div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="lat" className="text-xs">
                          Latitude
                        </Label>
                        <Input
                          id="lat"
                          type="number"
                          value={newListing.location[0]}
                          onChange={(e) =>
                            setNewListing((prev) => ({
                              ...prev,
                              location: [
                                parseFloat(e.target.value) || 0,
                                prev.location[1],
                              ],
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="lng" className="text-xs">
                          Longitude
                        </Label>
                        <Input
                          id="lng"
                          type="number"
                          value={newListing.location[1]}
                          onChange={(e) =>
                            setNewListing((prev) => ({
                              ...prev,
                              location: [
                                prev.location[0],
                                parseFloat(e.target.value) || 0,
                              ],
                            }))
                          }
                        />
                      </div>
                    </div>

                    <div className="mt-2 flex justify-end">
                      <a
                        href={getGoogleMapsUrl(newListing.location)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:text-blue-700 flex items-center"
                      >
                        View on Google Maps
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 flex justify-between">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setNewListing({
                      title: "",
                      description: "",
                      price: 0,
                      area: 0,
                      location: [20.5937, 78.9629],
                    });
                  }}
                >
                  Reset
                </Button>
                <Button onClick={handleAddListing} className="gap-1">
                  <Plus className="h-4 w-4" />
                  Add Listing
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
