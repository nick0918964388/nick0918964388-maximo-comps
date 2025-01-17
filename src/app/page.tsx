import Image from "next/image";
import Header from "./components/common/Header";
import { PAGE_TITLES } from "./config/titles";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={PAGE_TITLES.HOME} />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              href="/components/dashboard"
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                    Operations Dashboard
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Comprehensive dashboard showing maintenance and material management metrics
                  </p>
                </div>
              </div>
            </a>

            <a
              href="/components/maintenance-chart"
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                    Maintenance Cost Chart
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Interactive chart component showing preventive and corrective maintenance costs
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
