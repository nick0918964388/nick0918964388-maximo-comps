import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Maximo Components</h1>
          <p className="text-lg text-gray-600">
            Explore our collection of modern UI components
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
}
