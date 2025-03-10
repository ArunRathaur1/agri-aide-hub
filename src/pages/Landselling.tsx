"use client"; // Required for Next.js if using Client Components
import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import MapView from "@/components/landselling/MapView";
import AddListing from "@/components/landselling/AddListing";
import { LandListing } from "@/types/landselling";
import { saveListings, getListings } from "@/services/landListingService";

export default function Landselling() {
  const [activeTab, setActiveTab] = useState("map");
  const [listings, setListings] = useState<LandListing[]>([]);
  const { toast } = useToast();

  // Load listings from local storage on component mount
  useEffect(() => {
    const savedListings = getListings();
    if (savedListings && savedListings.length > 0) {
      setListings(savedListings);
      toast({
        title: "Listings loaded",
        description: `Loaded ${savedListings.length} land listings from storage.`,
      });
    }
  }, []);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleAddListing = (newListingData: Omit<LandListing, "id">) => {
    if (
      !newListingData.title ||
      newListingData.price <= 0 ||
      newListingData.area <= 0
    ) {
      toast({
        title: "Invalid listing",
        description: "Please fill all required fields with valid values.",
        variant: "destructive",
      });
      return;
    }

    const newItem: LandListing = {
      id: Date.now().toString(),
      ...newListingData,
    };

    const updatedListings = [...listings, newItem];
    setListings(updatedListings);

    // Save to local storage
    saveListings(updatedListings);

    toast({
      title: "Listing added",
      description:
        "Your land listing has been added successfully and saved to storage.",
    });

    // Switch to map view
    handleTabChange("map");
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
            forceMount={activeTab === "map" ? true : undefined}
          >
            <MapView listings={listings} activeTab={activeTab} />
          </TabsContent>

          <TabsContent
            value="add"
            className="space-y-4"
            forceMount={activeTab === "add" ? true : undefined}
          >
            <AddListing activeTab={activeTab} onAddListing={handleAddListing} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
