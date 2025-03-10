import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { LandListing, getGoogleMapsUrl } from "@/types/landselling";
import { ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS

interface MapViewProps {
  listings: LandListing[];
  activeTab: string;
}

export default function MapView({ listings, activeTab }: MapViewProps) {
  const mainMapRef = useRef<L.Map | null>(null);
  const mainMapContainerRef = useRef<HTMLDivElement>(null);
  const [isMainMapInitialized, setIsMainMapInitialized] = React.useState(false);

  // Initialize the main map (once)
  useEffect(() => {
    if (!mainMapContainerRef.current) return;

    // Only initialize map if it's not already initialized
    if (activeTab === "map" && !isMainMapInitialized) {
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
    }

    return () => {
      if (mainMapRef.current && activeTab !== "map") {
        mainMapRef.current.remove();
        mainMapRef.current = null;
        setIsMainMapInitialized(false);
      }
    };
  }, [mainMapContainerRef.current, activeTab]);

  // Update main map markers when listings change
  useEffect(() => {
    updateMainMapMarkers();
  }, [listings]);

  // Effect to handle visible tab resizing
  useEffect(() => {
    if (activeTab === "map" && mainMapRef.current) {
      setTimeout(() => {
        mainMapRef.current?.invalidateSize();
        updateMainMapMarkers();
      }, 100); // Short delay to ensure DOM is updated
    }
  }, [activeTab]);

  // Function to update markers on the main map
  const updateMainMapMarkers = () => {
    if (!mainMapRef.current || activeTab !== "map") return;

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

  return (
    <Card className={activeTab !== "map" ? "hidden" : ""}>
      <CardHeader>
        <CardTitle>Land Listings Map</CardTitle>
        <CardDescription>
          Browse available agricultural land for sale. Click on markers to view
          details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Map container with fixed height */}
        <div
          ref={mainMapContainerRef}
          className="h-96 w-full rounded-md border"
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
                        mainMapRef.current.setView(listing.location, 12);
                    }}
                  >
                    <div className="w-full flex justify-between items-center">
                      <div>
                        <p className="font-medium truncate">{listing.title}</p>
                        <p className="text-xs text-muted-foreground">
                          ₹{listing.price.toLocaleString()} • {listing.area}{" "}
                          acres
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
  );
}
