// "use client";
// // import NavigationBar from "@/components/admin/Navigation";
// import Link from "next/link";
// import React, { useCallback, useEffect, useState } from "react";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import axios from "axios";
// import User from "../users/page";

// function Dashboard() {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [users, setUsers] = useState<User[]>([]); // State for user data

//   const fetchUsers = useCallback(async () => {
//     try {
//       const { data } = await axios.get<User[]>("/api/user/userlist");
//       setUsers(data); // Update user state
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchUsers();
//   }, [fetchUsers]);

//   const dashboardData = [
//     {
//       heading: "Total Users", // Update heading to reflect user count
//       value: users.length, // Display actual user count
//       button: `All Users`,
//       link: "/admin/users", // Optional: Add link to user list page
//     }, // ... other dashboard items
//     {
//       heading: "Total Users", // Update heading to reflect user count
//       value: users.length, // Display actual user count
//       button: `All Users`,
//       link: "/admin/users", // Optional: Add link to user list page
//     }, // ... other dashboard items
//   ];

//   const data = [
//     { link: "/", name: "Home" },
//     { link: "/admin", name: "Admin" },
//     { link: "/admin/users", name: "Users" }, // Link to user list
//     { link: "/admin/calculator", name: "Calculators" },
//     { link: "/admin/dashboard", name: "Dashboard" },
//   ];

//   return (
//     <>
//       <div className="dashboard flex mx-auto w-[95%] p-7 rounded-xl my-14  ">
//         {/* ... other content */}
//         <div className=" w-full p-7">
//           <div className="flex gap-14 flex-wrap justify-around px-7 w-full">
//             {dashboardData.map((item) => (
//               <div
//                 key={item.heading}
//                 className={
//                   item.heading == "Total Reports"
//                     ? "shadow-xl py-4 px-3 rounded-xl flex-grow w-full border border-gray-700 justify-between"
//                     : "shadow-xl py-4 px-9 rounded-xl flex-shrink border border-gray-700"
//                 }
//               >
//                 <h2 className="text-4xl font-bold text-center">
//                   {item.heading}
//                 </h2>

//                 {loading ? (
//                   <p className="my-3 font-semibold text-gray-700 text-2xl text-center">
//                     Loading...
//                   </p>
//                 ) : error ? (
//                   <p className="my-3 font-semibold text-red-500 text-2xl text-center">
//                     Error: {error}
//                   </p>
//                 ) : (
//                   // Display user count when data is available
//                   <p className="my-3 font-semibold text-gray-700 text-2xl text-center">
//                     {users.length}
//                   </p>
//                 )}

//                 {item.link && ( // Optional: Display link to user list if provided
//                   <div className="flex justify-center py-3">
//                     <Link href={item.link}>
//                       <button className="secondary-background text-2xl text-white font-bold rounded-md px-5 py-2">
//                         {item.button}
//                       </button>
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//           {/* ... other content */}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Dashboard;

// import React, { useCallback, useEffect, useState } from "react";
// import axios from "axios";
// import { Chart } from "chart.js";

// // Interface for User data type
// interface User {
//   id: number;
//   name: string;
//   // Replace with your actual attribute name and type (e.g., number, string)
//   yourAttribute: number; // Example: age, income, etc.
// }

// function Dashboard() {
//   const [users, setUsers] = useState<User[]>([]);

//   const fetchUsers = useCallback(async () => {
//     try {
//       const { data } = await axios.get<User[]>("/api/user/userlist");
//       setUsers(data);
//     } catch (err) {
//       console.error(err);
//     }
//   }, []);

//   useEffect(() => {
//     fetchUsers();
//   }, [fetchUsers]);

//   const createOgiveGraph = (usersData: User[]) => {
//     // Extract the numerical attribute (replace 'age' with your desired attribute)
//     const userAttribute = usersData.map((user) => user.yourAttribute);

//     // Sort the data in ascending order for the attribute
//     const sortedAttribute = userAttribute.sort((a, b) => a - b); // Corrected sorting logic

//     // Calculate cumulative frequency
//     const cumulativeFrequency = sortedAttribute.map((_, index) => index + 1); // Using index for cumulative count

//     const ctx = document
//       .getElementById("myChart")
//       ?.getContext("2d") as CanvasRenderingContext2D;

//     // Create the chart using Chart.js (assuming it's already imported)
//     new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: sortedAttribute,
//         datasets: [
//           {
//             label: "Cumulative Frequency",
//             data: cumulativeFrequency,
//             fill: false,
//             borderColor: "rgba(75, 192, 192, 1)",
//           },
//         ],
//       },
//       options: {
//         scales: {
//           x: {
//             title: {
//               display: true,
//               text: "Your Attribute Name", // Replace with actual attribute name
//             },
//           },
//           y: {
//             title: {
//               display: true,
//               text: "Number of Users",
//             },
//           },
//         },
//       },
//     });
//   };

//   useEffect(() => {
//     if (users.length > 0) {
//       createOgiveGraph(users);
//     }
//   }, [users]);

//   return (
//     <div>
//       <canvas id="myChart" width="400" height="200"></canvas>
//     </div>
//   );
// }

// export default Dashboard;
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  Chart,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

// Register Chart.js components
Chart.register(BarController, CategoryScale, LinearScale, BarElement, Title);

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const chartRef = React.useRef<Chart<"bar"> | null>(null); // Use a ref to store the chart instance

  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await axios.get<User[]>("/api/user/userlist");
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const createUserRoleChart = (usersData: User[]) => {
    // Count the number of admins and non-admins
    const adminCount = usersData.filter((user) => user.isAdmin).length;
    const clientCount = usersData.length - adminCount;

    const canvas = document.getElementById(
      "myChart"
    ) as HTMLCanvasElement | null;
    if (!canvas) {
      console.error("Canvas element not found");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Failed to get canvas 2D context");
      return;
    }

    // Destroy the previous chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create a new chart instance and store it in the ref
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [`Admin ${adminCount}`, `Client ${clientCount}`],
        datasets: [
          {
            label: "User Count",
            data: [adminCount, clientCount],
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top" as const,
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `Count: ${tooltipItem.raw}`;
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "User Role",
            },
            grid: {
              display: false, // Disable the grid lines on the X-axis
            },
          },
          y: {
            title: {
              display: true,
              text: "Number of Users",
            },
            grid: {
              display: false, // Disable the grid lines on the Y-axis
            },
            ticks: {
              beginAtZero: true,
              display: false, // Hide the numbers on the Y-axis
            },
          },
        },
        animation: {
          duration: 1000, // Duration of animations in milliseconds
          easing: "easeInOutBounce", // Easing function for animations
        },
      },
    });
  };

  useEffect(() => {
    if (users.length > 0) {
      createUserRoleChart(users);
    }
  }, [users]);

  return (
    <div className="w-[70%] my-10 max-h-[50vh]">
      <canvas id="myChart" width="100" height="150"></canvas>
    </div>
  );
};

export default Dashboard;
