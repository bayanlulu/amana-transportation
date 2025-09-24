"use client";

import React, { useState, useEffect } from "react";

// Extend the global Window object to include the Leaflet 'L' property
declare global {
  interface Window {
    L: any; // Using 'any' for simplicity with the dynamic script load
  }
}

// The sample API data structure
interface BusStop {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  estimated_arrival: string;
  is_next_stop: boolean;
}

interface Incident {
  id: number;
  type: string;
  description: string;
  reported_by: string;
  reported_time: string;
  status: string;
  priority: string;
}

interface VehicleInfo {
  license_plate: string;
  model: string;
  year: number;
  fuel_level: number;
  last_maintenance: string;
}

interface RouteInfo {
  total_distance: number;
  average_speed: number;
  estimated_completion: string;
  frequency_minutes: number;
}

interface Bus {
  id: number;
  name: string;
  route_number: string;
  current_location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  status: string;
  passengers: {
    current: number;
    capacity: number;
    utilization_percentage: number;
  };
  driver: {
    name: string;
    id: string;
    shift_start: string;
    shift_end: string;
  };
  bus_stops: BusStop[];
  incidents: Incident[];
  vehicle_info: VehicleInfo;
  route_info: RouteInfo;
}

interface ApiData {
  message: string;
  company_info: {
    name: string;
    founded: string;
    headquarters: string;
    industry: string;
    description: string;
  };
  bus_lines: Bus[];
  operational_summary: {
    total_buses: number;
    active_buses: number;
    maintenance_buses: number;
    out_of_service_buses: number;
    total_capacity: number;
    current_passengers: number;
    average_utilization: number;
  };
  filters: {
    available_statuses: string[];
    available_routes: string[];
    applied: {
      status: string | null;
      busId: number | null;
      routeNumber: string | null;
    };
  };
}

// The sample API data provided 
const apiData: ApiData = {
  message: "Amana Transportation bus data retrieved successfully",
  company_info: {
    name: "Amana Transportation",
    founded: "2019",
    headquarters: "Kuala Lumpur, Malaysia",
    industry: "Public Transportation",
    description:
      "Modern public bus service connecting key areas in Kuala Lumpur and surrounding regions, focused on reliability and passenger comfort.",
  },
  bus_lines: [
    {
      id: 1,
      name: "KLCC - Petaling Jaya Express",
      route_number: "B101",
      current_location: {
        latitude: 3.158,
        longitude: 101.711,
        address: "Jalan Ampang, near KLCC Twin Towers, Kuala Lumpur",
      },
      status: "Active",
      passengers: {
        current: 32,
        capacity: 45,
        utilization_percentage: 71,
      },
      driver: {
        name: "Ahmad Rahman",
        id: "DRV001",
        shift_start: "06:00",
        shift_end: "18:00",
      },
      bus_stops: [
        {
          id: 1,
          name: "KLCC Station",
          latitude: 3.1578,
          longitude: 101.7114,
          estimated_arrival: "14:20",
          is_next_stop: true,
        },
        {
          id: 2,
          name: "Pavilion KL",
          latitude: 3.149,
          longitude: 101.7101,
          estimated_arrival: "14:28",
          is_next_stop: false,
        },
        {
          id: 3,
          name: "Mid Valley Megamall",
          latitude: 3.1177,
          longitude: 101.6774,
          estimated_arrival: "14:42",
          is_next_stop: false,
        },
        {
          id: 4,
          name: "KL Sentral",
          latitude: 3.1338,
          longitude: 101.6869,
          estimated_arrival: "14:50",
          is_next_stop: false,
        },
        {
          id: 5,
          name: "Universiti Malaya",
          latitude: 3.1204,
          longitude: 101.6535,
          estimated_arrival: "15:05",
          is_next_stop: false,
        },
        {
          id: 6,
          name: "Petaling Jaya SS2",
          latitude: 3.1147,
          longitude: 101.624,
          estimated_arrival: "15:18",
          is_next_stop: false,
        },
        {
          id: 7,
          name: "1 Utama Shopping Centre",
          latitude: 3.1502,
          longitude: 101.6154,
          estimated_arrival: "15:35",
          is_next_stop: false,
        },
      ],
      incidents: [
        {
          id: 1,
          type: "Passenger",
          description: "Medical emergency",
          reported_by: "Driver-1A",
          reported_time: "4:51 AM",
          status: "Canceled",
          priority: "Medium",
        },
      ],
      vehicle_info: {
        license_plate: "WKL 2891",
        model: "Scania K230UB",
        year: 2019,
        fuel_level: 75,
        last_maintenance: "2024-12-01",
      },
      route_info: {
        total_distance: 28.5,
        average_speed: 25,
        estimated_completion: "16:00",
        frequency_minutes: 20,
      },
    },
    {
      id: 2,
      name: "Old Town - Mont Kiara Connector",
      route_number: "B205",
      current_location: {
        latitude: 3.139,
        longitude: 101.6869,
        address: "KL Sentral Transportation Hub, Kuala Lumpur",
      },
      status: "Active",
      passengers: {
        current: 28,
        capacity: 40,
        utilization_percentage: 70,
      },
      driver: {
        name: "Siti Aminah",
        id: "DRV002",
        shift_start: "05:30",
        shift_end: "17:30",
      },
      bus_stops: [
        {
          id: 1,
          name: "KL Sentral",
          latitude: 3.1338,
          longitude: 101.6869,
          estimated_arrival: "14:15",
          is_next_stop: false,
        },
        {
          id: 2,
          name: "Central Market",
          latitude: 3.1427,
          longitude: 101.6964,
          estimated_arrival: "14:25",
          is_next_stop: true,
        },
        {
          id: 3,
          name: "Chinatown",
          latitude: 3.1436,
          longitude: 101.6958,
          estimated_arrival: "14:30",
          is_next_stop: false,
        },
        {
          id: 4,
          name: "Titiwangsa LRT",
          latitude: 3.1729,
          longitude: 101.7016,
          estimated_arrival: "14:45",
          is_next_stop: false,
        },
        {
          id: 5,
          name: "Mont Kiara",
          latitude: 3.1727,
          longitude: 101.6509,
          estimated_arrival: "15:00",
          is_next_stop: false,
        },
        {
          id: 6,
          name: "Sri Hartamas",
          latitude: 3.1653,
          longitude: 101.6493,
          estimated_arrival: "15:10",
          is_next_stop: false,
        },
      ],
      incidents: [],
      vehicle_info: {
        license_plate: "WKL 1547",
        model: "Mercedes-Benz Citaro",
        year: 2020,
        fuel_level: 60,
        last_maintenance: "2024-11-28",
      },
      route_info: {
        total_distance: 22.3,
        average_speed: 22,
        estimated_completion: "15:30",
        frequency_minutes: 25,
      },
    },
    {
      id: 3,
      name: "Airport - City Circle",
      route_number: "B350",
      current_location: {
        latitude: 2.7456,
        longitude: 101.7072,
        address: "KLIA Express Station, Sepang, Selangor",
      },
      status: "Active",
      passengers: {
        current: 15,
        capacity: 50,
        utilization_percentage: 30,
      },
      driver: {
        name: "Lim Wei Ming",
        id: "DRV003",
        shift_start: "04:00",
        shift_end: "16:00",
      },
      bus_stops: [
        {
          id: 1,
          name: "KLIA Terminal 1",
          latitude: 2.7456,
          longitude: 101.7072,
          estimated_arrival: "14:30",
          is_next_stop: false,
        },
        {
          id: 2,
          name: "KLIA Terminal 2",
          latitude: 2.7389,
          longitude: 101.6997,
          estimated_arrival: "14:40",
          is_next_stop: false,
        },
        {
          id: 3,
          name: "Putrajaya Central",
          latitude: 2.9264,
          longitude: 101.6964,
          estimated_arrival: "15:10",
          is_next_stop: true,
        },
        {
          id: 4,
          name: "Cyberjaya",
          latitude: 2.9213,
          longitude: 101.6543,
          estimated_arrival: "15:25",
          is_next_stop: false,
        },
        {
          id: 5,
          name: "Bandar Tun Razak",
          latitude: 3.0733,
          longitude: 101.7317,
          estimated_arrival: "15:55",
          is_next_stop: false,
        },
        {
          id: 6,
          name: "KL City Centre",
          latitude: 3.1519,
          longitude: 101.7077,
          estimated_arrival: "16:20",
          is_next_stop: false,
        },
        {
          id: 7,
          name: "Batu Caves",
          latitude: 3.2379,
          longitude: 101.684,
          estimated_arrival: "16:45",
          is_next_stop: false,
        },
        {
          id: 8,
          name: "Gombak Terminal",
          latitude: 3.2642,
          longitude: 101.7003,
          estimated_arrival: "17:00",
          is_next_stop: false,
        },
      ],
      incidents: [
        {
          id: 1,
          type: "Route",
          description: "GPS malfunction",
          reported_by: "Driver-3A",
          reported_time: "12:18 PM",
          status: "Resolved",
          priority: "Critical",
        },
      ],
      vehicle_info: {
        license_plate: "WKL 3429",
        model: "Volvo B8RLE",
        year: 2018,
        fuel_level: 40,
        last_maintenance: "2024-12-03",
      },
      route_info: {
        total_distance: 85.2,
        average_speed: 35,
        estimated_completion: "17:30",
        frequency_minutes: 45,
      },
    },
    {
      id: 4,
      name: "University Express",
      route_number: "B410",
      current_location: {
        latitude: 3.1204,
        longitude: 101.6535,
        address: "Universiti Malaya Main Campus, Kuala Lumpur",
      },
      status: "Maintenance",
      passengers: {
        current: 0,
        capacity: 35,
        utilization_percentage: 0,
      },
      driver: {
        name: "Raj Kumar",
        id: "DRV004",
        shift_start: "06:30",
        shift_end: "18:30",
      },
      bus_stops: [
        {
          id: 1,
          name: "Universiti Malaya",
          latitude: 3.1204,
          longitude: 101.6535,
          estimated_arrival: "N/A",
          is_next_stop: false,
        },
        {
          id: 2,
          name: "UCSI University",
          latitude: 3.0411,
          longitude: 101.7089,
          estimated_arrival: "N/A",
          is_next_stop: false,
        },
        {
          id: 3,
          name: "Taylor's University",
          latitude: 3.0653,
          longitude: 101.6075,
          estimated_arrival: "N/A",
          is_next_stop: false,
        },
        {
          id: 4,
          name: "Sunway University",
          latitude: 3.0653,
          longitude: 101.6037,
          estimated_arrival: "N/A",
          is_next_stop: false,
        },
        {
          id: 5,
          name: "INTI International University",
          latitude: 3.0534,
          longitude: 101.5934,
          estimated_arrival: "N/A",
          is_next_stop: false,
        },
        {
          id: 6,
          name: "Monash University Malaysia",
          latitude: 3.0653,
          longitude: 101.6016,
          estimated_arrival: "N/A",
          is_next_stop: false,
        },
      ],
      incidents: [
        {
          id: 1,
          type: "Passenger",
          description: "Wheelchair accessibility request",
          reported_by: "Driver-4A",
          reported_time: "12:44 PM",
          status: "Canceled",
          priority: "Critical",
        },
      ],
      vehicle_info: {
        license_plate: "WKL 7856",
        model: "Isuzu NPR",
        year: 2017,
        fuel_level: 85,
        last_maintenance: "2024-12-05",
      },
      route_info: {
        total_distance: 45.8,
        average_speed: 20,
        estimated_completion: "N/A",
        frequency_minutes: 30,
      },
    },
    {
      id: 5,
      name: "Shopping District Shuttle",
      route_number: "B520",
      current_location: {
        latitude: 3.149,
        longitude: 101.7101,
        address: "Pavilion Kuala Lumpur, Bukit Bintang",
      },
      status: "Active",
      passengers: {
        current: 42,
        capacity: 45,
        utilization_percentage: 93,
      },
      driver: {
        name: "Fatimah Zahra",
        id: "DRV005",
        shift_start: "07:00",
        shift_end: "19:00",
      },
      bus_stops: [
        {
          id: 1,
          name: "Pavilion KL",
          latitude: 3.149,
          longitude: 101.7101,
          estimated_arrival: "14:22",
          is_next_stop: false,
        },
        {
          id: 2,
          name: "Lot 10 Shopping Centre",
          latitude: 3.1479,
          longitude: 101.71,
          estimated_arrival: "14:25",
          is_next_stop: true,
        },
        {
          id: 3,
          name: "Times Square KL",
          latitude: 3.1427,
          longitude: 101.7105,
          estimated_arrival: "14:32",
          is_next_stop: false,
        },
        {
          id: 4,
          name: "Suria KLCC",
          latitude: 3.158,
          longitude: 101.7123,
          estimated_arrival: "14:40",
          is_next_stop: false,
        },
        {
          id: 5,
          name: "Avenue K",
          latitude: 3.1612,
          longitude: 101.7197,
          estimated_arrival: "14:48",
          is_next_stop: false,
        },
        {
          id: 6,
          name: "Intermark Mall",
          latitude: 3.1606,
          longitude: 101.7209,
          estimated_arrival: "14:52",
          is_next_stop: false,
        },
        {
          id: 7,
          name: "Ampang Park LRT",
          latitude: 3.1615,
          longitude: 101.713,
          estimated_arrival: "15:00",
          is_next_stop: false,
        },
        {
          id: 8,
          name: "Low Yat Plaza",
          latitude: 3.1468,
          longitude: 101.7099,
          estimated_arrival: "15:08",
          is_next_stop: false,
        },
        {
          id: 9,
          name: "Fahrenheit 88",
          latitude: 3.1472,
          longitude: 101.7097,
          estimated_arrival: "15:12",
          is_next_stop: false,
        },
      ],
      incidents: [
        {
          id: 1,
          type: "Mechanical",
          description: "Engine overheating",
          reported_by: "Driver-5A",
          reported_time: "8:56 AM",
          status: "Reported",
          priority: "Low",
        },
        {
          id: 2,
          type: "Passenger",
          description: "Lost item report",
          reported_by: "Driver-5B",
          reported_time: "11:26 AM",
          status: "Canceled",
          priority: "Low",
        },
      ],
      vehicle_info: {
        license_plate: "WKL 9123",
        model: "BYD K9",
        year: 2021,
        fuel_level: 95,
        last_maintenance: "2024-11-30",
      },
      route_info: {
        total_distance: 12.7,
        average_speed: 15,
        estimated_completion: "15:30",
        frequency_minutes: 15,
      },
    },
  ],
  operational_summary: {
    total_buses: 5,
    active_buses: 4,
    maintenance_buses: 1,
    out_of_service_buses: 0,
    total_capacity: 215,
    current_passengers: 117,
    average_utilization: 53,
  },
  filters: {
    available_statuses: ["Active", "Maintenance", "Out of Service"],
    available_routes: ["B101", "B205", "B350", "B410", "B520"],
    applied: {
      status: null,
      busId: null,
      routeNumber: null,
    },
  },
};

const busData: Bus[] = apiData.bus_lines;

// Header Component
const Header: React.FC = () => (
  <header className="text-[#3B3A36] p-6">
    <nav className="bg-[#5C5C59] flex justify-between items-center max-w-7xl mx-auto rounded-lg">
      <div className="text-lg rounded-xl px-6 py-6 bg-transparent text-white border border-transparent">Amana<span className="text-[#D4C499]">Way</span></div>
      <div className="p-4 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
      {/* <div className="p-4 text-white">Menu</div> */}
    </nav>
    <div className="text-center mt-4 bg-[#008953] p-6 rounded-lg mx-auto max-w-7xl">
      <h1 className="text-4xl font-extrabold rounded-lg text-white">Amana Transportation</h1>
      <p className="mt-2 text-lg rounded-lg text-white">
        Proudly Servicing Malaysian Bus Riders Since 2019!
      </p>
    </div>
  </header>
);

interface BusButtonsProps {
  selectedBusId: number;
  onBusSelect: (busId: number) => void;
}

// Bus Buttons Component
const BusButtons: React.FC<BusButtonsProps> = ({ selectedBusId, onBusSelect }) => (
  <div className="flex flex-wrap gap-2 my-4">
    {busData.map((bus: Bus) => (
      <button
        key={bus.id}
        onClick={() => onBusSelect(bus.id)}
        className={`px-4 py-2 rounded-lg font-medium transition-colors border-2 border-[#D4C499] ${
          selectedBusId === bus.id
            ? "bg-[#D4C499] text-[#3B3A36] font-bold"
            : "bg-[#F8F5F1] text-[#3B3A36] hover:bg-[#D4C499]"
        }`}
      >
        Bus {bus.route_number}
      </button>
    ))}
  </div>
);

interface BusMapProps {
  selectedBus: Bus | undefined;
  isLeafletLoaded: boolean;
}

// Map Component
const BusMap: React.FC<BusMapProps> = ({ selectedBus, isLeafletLoaded }) => {
  useEffect(() => {
    if (isLeafletLoaded && window.L) {
      const L = window.L;
      const mapContainer = document.getElementById("map") as HTMLElement;
      if (!mapContainer) return;

      // Initialize map and remove previous instances
      // To prevent re-initialization on re-renders, we check for an existing leaflet instance
      if ((mapContainer as any)._leaflet_id) {
          (mapContainer as any)._leaflet_id = null;
      }

      const map = L.map(mapContainer, {
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        dragging: false,
      }).setView([3.139, 101.6869], 12);

      // Fix for Leaflet's default icon not loading properly
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
      
      // Icon for bus stops (data URI SVG)
      const stopIcon = L.icon({
        iconUrl:
          "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%20C15.3137%2012%2018%209.31371%2018%206%20C18%202.68629%2015.3137%200%2012%200%20C8.68629%200%206%202.68629%206%206%20C6%209.31371%208.68629%2012%2012%2012%20Z%22%20fill%3D%22%232563EB%22%2F%3E%3C%2Fsvg%3E",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12],
      });

      // Icon for bus (data URI SVG)
      const busIcon = L.icon({
        iconUrl:
          "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2230%22%20height%3D%2230%22%20viewBox%3D%220%200%2030%2030%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M27.2727%206.13636C27.2727%205.15843%2026.4764%204.36364%2025.5%204.36364H23.6364C23.6364%202.32766%2021.9687%200.681824%2019.9659%200.681824H9.95455C7.94851%200.681824%206.27273%202.32168%206.27273%204.36364H4.54545C3.56846%204.36364%202.77273%205.15843%202.77273%206.13636V22.5455C2.77273%2023.5234%203.56846%2024.3182%204.54545%2024.3182H5.45455V27.2727C5.45455%2028.2507%206.25028%2029.0455%207.22727%2029.0455H9.09091C10.0689%2029.0455%2010.8636%2028.2507%2010.8636%2027.2727V25.4091H19.0455V27.2727C19.0455%2028.2507%2019.8402%2029.0455%2020.8182%2029.0455H22.6818C23.6598%2029.0455%2024.4545%2028.2507%2024.4545%2027.2727V24.0909H25.5C26.4764%2024.0909%2027.2727%2023.2961%2027.2727%2022.3182V6.13636ZM8.04545%2019.9091C6.9189%2019.9091%206%2019.0069%206%2017.8803C6%2016.7538%206.9189%2015.8516%208.04545%2015.8516C9.172%2015.8516%2010.0909%2016.7538%2010.0909%2017.8803C10.0909%2019.0069%209.172%2019.9091%208.04545%2019.9091ZM21.9545%2019.9091C20.828%2019.9091%2019.9091%2019.0069%2019.9091%2017.8803C19.9091%2016.7538%2020.828%2015.8516%2021.9545%2015.8516C23.0811%2015.8516%2024%2016.7538%2024%2017.8803C24%2019.0069%2023.0811%2019.9091%2021.9545%2019.9091ZM21.8182%208.45455H8.04545C7.06846%208.45455%206.27273%209.24928%206.27273%2010.2273V13.0909H23.6364V10.2273C23.6364%209.24928%2022.8407%208.45455%2021.8182%208.45455Z%22%20fill%3D%22%23EF4444%22%2F%3E%3C%2Fsvg%3E",
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15],
      });
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: "© OpenStreetMap contributors, © CartoDB",
      }).addTo(map);

      if (selectedBus) {
        // Add bus stops for the selected bus
        selectedBus.bus_stops.forEach((stop: BusStop) => {
          const marker = L.marker([stop.latitude, stop.longitude], { icon: stopIcon }).addTo(map);
          marker.bindPopup(
            L.popup().setContent(
              `<div class="bg-white p-2 rounded-md shadow-md text-gray-800 font-sans">
                <b>${stop.name}</b><br/>
                Next arrival: ${stop.estimated_arrival}
              </div>`
            )
          );
        });

        // Add the current bus location
        const busLocation = selectedBus.current_location;
        const busMarker = L.marker([busLocation.latitude, busLocation.longitude], {
          icon: busIcon,
        }).addTo(map);
        busMarker.bindPopup(
          L.popup().setContent(
            `<div class="bg-white p-2 rounded-md shadow-md text-gray-800 font-sans">
              <b>${selectedBus.name}</b><br/>
              Passengers: ${selectedBus.passengers.current} / ${selectedBus.passengers.capacity} (${selectedBus.passengers.utilization_percentage}%)<br/>
              Next Stop: ${
                selectedBus.bus_stops.find((s: BusStop) => s.is_next_stop)?.name || "N/A"
              }
            </div>`
          )
        );

        // Add a polyline to represent the bus route
        const routeCoordinates = [
          [busLocation.latitude, busLocation.longitude],
          ...selectedBus.bus_stops.map((stop: BusStop) => [stop.latitude, stop.longitude]),
        ];
        const polyline = L.polyline(routeCoordinates, {color: '#008953', weight: 3}).addTo(map);

        // Fit map to markers and route
        const bounds = polyline.getBounds();
        map.fitBounds(bounds, { padding: [50, 50] });
      }

      // Cleanup function to remove the map
      return () => {
        map.remove();
      };
    }
  }, [selectedBus, isLeafletLoaded]);

  return (
    <div className="p-6 rounded-lg shadow-md mt-6 border-2 border-[#D4C499]">
      <div id="map" className="w-full h-[500px] rounded-lg border-2 border-[#D4C499]"></div>
    </div>
  );
};

// Operational Summary Component from API data
interface OperationalSummaryProps {
  summary: ApiData["operational_summary"];
}

const OperationalSummary: React.FC<OperationalSummaryProps> = ({ summary }) => (
  <div className="p-6 rounded-lg shadow-md border-2 border-[#D4C499] bg-[#F8F5F1]">
    <h2 className="text-2xl font-semibold text-[#3B3A36] text-center mb-4 p-4 rounded-lg border-2 border-[#D4C499] bg-[#F0EEEA]">Operational Summary</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-3xl font-bold text-[#008953]">{summary.total_buses}</div>
        <div className="text-sm text-[#5C5C59]">Total Buses</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-3xl font-bold text-[#008953]">{summary.active_buses}</div>
        <div className="text-sm text-[#5C5C59]">Active Buses</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-3xl font-bold text-[#008953]">{summary.maintenance_buses}</div>
        <div className="text-sm text-[#5C5C59]">In Maintenance</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-3xl font-bold text-[#008953]">{summary.out_of_service_buses}</div>
        <div className="text-sm text-[#5C5C59]">Out of Service</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-3xl font-bold text-[#008953]">{summary.current_passengers}</div>
        <div className="text-sm text-[#5C5C59]">Current Passengers</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-3xl font-bold text-[#008953]">{summary.average_utilization}%</div>
        <div className="text-sm text-[#5C5C59]">Avg. Utilization</div>
      </div>
    </div>
  </div>
);

interface BusScheduleProps {
  selectedBus: Bus | undefined;
}

// Table Component
const BusSchedule: React.FC<BusScheduleProps> = ({ selectedBus }) => (
  <div className="p-6 rounded-lg shadow-md mt-6 border-2 border-[#D4C499] bg-[#F8F5F1]">
    <div className="overflow-x-auto rounded-lg border-2 border-[#D4C499]">
      <table className="min-w-full divide-y divide-[#D4C499]">
        <thead className="bg-[#D4C499]">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[#3B3A36] uppercase tracking-wider rounded-tl-lg">
              Bus Stop
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[#3B3A36] uppercase tracking-wider rounded-tr-lg">
              Next Time of Arrival
            </th>
          </tr>
        </thead>
        <tbody className="bg-[#F8F5F1] divide-y divide-[#D4C499]">
          {selectedBus?.bus_stops.map((stop: BusStop) => (
            <tr
              key={stop.id}
              className={`${
                stop.is_next_stop ? "bg-[#FFF9E6] font-bold" : "hover:bg-[#F0EEEA]"
              } transition-colors`}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#3B3A36]">
                {stop.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#3B3A36]">
                {stop.estimated_arrival}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Incident List Component
interface IncidentListProps {
  incidents: Incident[];
}

const IncidentList: React.FC<IncidentListProps> = ({ incidents }) => (
  <div className="p-6 mt-6 rounded-lg shadow-md border-2 border-[#D4C499] bg-[#F8F5F1]">
    <h2 className="text-2xl font-semibold text-[#3B3A36] text-center mb-4 p-4 rounded-lg border-2 border-[#D4C499] bg-[#F0EEEA]">Incident List</h2>
    {incidents.length > 0 ? (
      <ul className="divide-y divide-[#D4C499]">
        {incidents.map((incident: Incident) => (
          <li key={incident.id} className="p-4 hover:bg-[#F0EEEA] transition-colors">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-lg text-[#3B3A36]">{incident.type} Incident</span>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                incident.status === "Resolved" ? "bg-green-100 text-green-700" :
                incident.status === "Reported" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
              }`}>{incident.status}</span>
            </div>
            <p className="text-sm text-[#5C5C59]">{incident.description}</p>
            <p className="text-xs text-[#5C5C59] mt-1">Reported by: {incident.reported_by} at {incident.reported_time}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-center text-[#5C5C59] p-4">No incidents reported for this bus.</p>
    )}
  </div>
);

// Footer Component
const Footer: React.FC = () => (
  <footer className="bg-[#5C5C59] text-white p-8 mt-6 text-center rounded-xl shadow-lg mx-auto max-w-7xl">
    <p className="font-bold text-lg">{apiData.company_info.name}</p>
    <p className="text-sm mt-1">Founded: {apiData.company_info.founded} | Headquarters: {apiData.company_info.headquarters}</p>
    <p className="text-xs mt-4 opacity-70">&copy; 2025 Amana Transportation. All rights reserved.</p>
  </footer>
);

const busLines: Bus[] = apiData.bus_lines;

export default function App() {
  const [selectedBusId, setSelectedBusId] = useState<number>(busLines[0].id);
  const selectedBus = busLines.find((bus: Bus) => bus.id === selectedBusId);
  const [isLeafletLoaded, setIsLeafletLoaded] = useState<boolean>(false);

  const handleBusSelect = (busId: number) => {
    setSelectedBusId(busId);
  };

  // Dynamically load Leaflet CSS and JS
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    link.crossOrigin = "";

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.crossOrigin = "";

    script.onload = () => {
      setIsLeafletLoaded(true);
    };

    document.head.appendChild(link);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-[#F8F5F1] min-h-screen font-sans">
      <Header />
      <main className="max-w-7xl mx-auto p-4 md:p-8 bg-[#F8F5F1]">
        {/* Operational Summary Section */}
        <OperationalSummary summary={apiData.operational_summary} />

        {/* Active Bus Map Section */}
        <h2 className="text-2xl font-semibold text-[#3B3A36] mt-8 text-center p-4 rounded-lg border-2 border-[#D4C499] bg-[#F0EEEA]">Active Bus Map</h2>
        <BusButtons selectedBusId={selectedBusId} onBusSelect={handleBusSelect} />
        <BusMap selectedBus={selectedBus} isLeafletLoaded={isLeafletLoaded} />
        
        {/* Bus Schedule Section */}
        <h2 className="text-2xl font-semibold text-[#3B3A36] text-center mt-6 p-4 rounded-lg border-2 border-[#D4C499] bg-[#F0EEEA]">Bus Schedule</h2>
        <BusButtons selectedBusId={selectedBusId} onBusSelect={handleBusSelect} />
        <BusSchedule selectedBus={selectedBus} />

        {/* Incident List Section */}
        <IncidentList incidents={selectedBus?.incidents || []} />
      </main>
      <Footer />
    </div>
  );
}
