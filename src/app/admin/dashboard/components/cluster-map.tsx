// src/app/admin/dashboard/components/cluster-map.tsx
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { NodeStatus } from "@/types";
import "leaflet/dist/leaflet.css";

// Dynamically import Leaflet components with no SSR
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

export function ClusterMap({ nodes }: { nodes: NodeStatus[] }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Initialize Leaflet icon options after component mounts
    import("leaflet").then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });
    });
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={5}
      style={{ height: "100%", width: "100%" }}
      className="rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {nodes.map((node) => (
        <Marker key={node.id} position={[node.location.lat, node.location.lng]}>
          <Popup>
            <div className="space-y-1 text-sm">
              <h3 className="font-bold text-cyan-600">{node.name}</h3>
              <p>Status: <span className="font-mono">{node.status}</span></p>
              <p>Throughput: <span className="font-mono text-purple-500">
                {node.throughput.toFixed(1)}MB/s
              </span></p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}