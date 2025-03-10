"use client"; // Required for Next.js if using Client Components

import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Landselling() {
  useEffect(() => {
    const map = L.map("map").setView([20.5937, 78.9629], 5); // Centered in India

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add a marker
    L.marker([20.5937, 78.9629])
      .addTo(map)
      .bindPopup("Land for Sale Here!")
      .openPopup();

    return () => {
      map.remove(); // Cleanup map instance on unmount
    };
  }, []);

  return (
    <div className="w-full h-screen">
      <h1 className="text-center text-xl font-bold my-4">
        Interactive Land Selling Map
      </h1>
      <div id="map" className="w-full h-[80vh]"></div>
    </div>
  );
}
