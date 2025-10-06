import { useState} from 'react'
import {
  Package as PackageIcon,
  RefreshCw as RefreshIcon,
  MessageCircle as MessageIcon,
  Mail as MailIcon,
  Clock as ClockIcon,
  AlertCircle as AlertIcon,
  Bell as BellIcon,
  CheckCircle as CheckCircleIcon,
  Truck as TruckIcon,
  Warehouse as WarehouseIcon,
  Home as HomeIcon,
  User as UserIcon,
  Phone as PhoneIcon,
  MapPin as LocationIcon,

  ShirtIcon,
} from 'lucide-react'
export function Track_order() {
  const [notifyEnabled, setNotifyEnabled] = useState(true)
  // Mock data that would normally come from an API
  const shipmentData = {
    id: '291731581',
    status: 'In Transit',
    eta: '14th October, 2025',
    packageCount: 1,
    weight:'56.7 Kg',
    timeline: [
      {
        step: 'Ordered',
        completed: true,
        
        
      },
      {
        step: 'Printed',
        date: 'Sep 22, 2:30 PM',
        
        completed: true,
      },
      {
        step: 'Shipped',
        date: 'Oct 02, 7:30 AM',
        completed: true,
        
      },
      {
        step: 'In Transit',
        date: 'Oct 04, 10:20 PM',
        completed: false,
        current: true,
        
      },
      {
        step: 'Delivered',
        date: 'Pending',
        completed: false,
      },
    ],
    courier: {
      name: 'DELHIVERY',
      trackingId: '9158110131482',
      bot: '---',
    },
    items: [
      {
        name: 'Tshirt',
        qty: 189,
      },
    //   {
    //     name: 'Circuit Board Array',
    //     qty: 1,
    //   },
    //   {
    //     name: 'Hydraulic Arm Component',
    //     qty: 2,
    //   },
    //   {
    //     name: 'Sensor Module Pack',
    //     qty: 4,
    //   },
    ],
    dimensions: '---',
    Weight:"---",
    recipient: {
      name: 'Swarup Chanda',
      phone: '+91-60035-01567',
      address:
        'Hostel-9D, NIT Silchar, NIT Road, 788010, Cachar, Assam',
    },
    activity: [
      {
        time: '21-09-2025',
        event: 'Ordered up from supplier',
      },
      {
        time: '28-09-2025',
        event: 'Printing Tshirt',
      },
      {
        time: '02-10-2025',
        event: 'Shipment Shipped From Suplier',
      },
      {
        time: '04-10-2025',
        event: 'Shipment In Transit From Suplier',
      },
    ],
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 font-sans">
      {/* Main container with cyber grid background */}
      <div
        className="min-h-screen relative"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(20, 20, 30, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(20, 20, 30, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      >
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <header className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-4 mb-6 flex flex-wrap items-center justify-between border border-gray-800 shadow-lg">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-lg bg-cyan-500/20 flex items-center justify-center mr-3">
                <PackageIcon className="h-6 w-6 text-cyan-400" />
              </div>
              <h1 className="text-2xl md:text-3xl font-spaced font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                Shipment Tracking
              </h1>
            </div>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Shipment Summary Card */}
              <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 mb-6 border border-gray-800 shadow-lg">
                <div className="flex flex-wrap justify-between items-start">
                  <div>
                    <div className="text-gray-400 font-spaced mb-1">Shipment ID</div>
                    <div className="text-xl font-bold text-white mb-4">
                      #{shipmentData.id}
                    </div>
                    <div className="flex flex-wrap gap-6 mt-2">
                      <div>
                        <div className="text-gray-400 font-spaced text-sm mb-1">ETA</div>
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 text-cyan-400 mr-2" />
                          <span>Expected by {shipmentData.eta}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400 font-spaced text-sm mb-1">
                          Package
                        </div>
                        <div className="flex items-center">
                          <div className="h-4 w-4 text-cyan-400 mr-2" />
                          <span>{shipmentData.packageCount} crates</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="text-gray-400 font-spaced mb-1">Status</div>
                    <div className="bg-cyan-500/20  text-cyan-400 px-4 py-1.5 rounded-full inline-block font-medium border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                      {shipmentData.status}
                    </div>
                  </div>
                </div>
                {/* Status Timeline */}
                <div className="mt-8">
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute h-1 bg-gray-700 top-7 left-0 right-0 z-0"></div>
                    {/* Timeline steps */}
                    <div className="flex justify-between relative z-10">
                      {shipmentData.timeline.map((step, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center w-1/5"
                        >
                          <div
                            className={`w-8 h-8 md:w-14 md:h-14  rounded-full flex items-center justify-center mb-2 
                            ${step.current ? 'bg-cyan-500/20 border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : step.completed ? 'bg-cyan-500/20 border border-cyan-500/50' : 'bg-gray-800 border border-gray-700'}`}
                          >
                            {index === 0 && (
                              <WarehouseIcon
                                className={`w-4 h-4 md:h-6 md:w-6 ${step.completed ? 'text-cyan-400' : 'text-gray-500'}`}
                              />
                            )}
                            {index === 1 && (
                              <PackageIcon
                                className={`w-4 h-4 md:h-6 md:w-6 ${step.completed ? 'text-cyan-400' : 'text-gray-500'}`}
                              />
                            )}
                            {index === 2 && (
                              <TruckIcon
                                className={`w-4 h-4 md:h-6 md:w-6 ${step.completed ? 'text-cyan-400' : 'text-gray-500'}`}
                              />
                            )}
                            {index === 3 && (
                              <TruckIcon
                                className={`w-4 h-4 md:h-6 md:w-6 ${step.completed ? 'text-cyan-400' : 'text-gray-500'}`}
                              />
                            )}
                            {index === 4 && (
                              <HomeIcon
                                className={`w-4 h-4 md:h-6 md:w-6 ${step.completed ? 'text-cyan-400' : 'text-gray-500'}`}
                              />
                            )}
                          </div>
                          <div
                            className={`text-sm font-medium ${step.current ? 'text-cyan-400' : step.completed ? 'text-white' : 'text-gray-500'}`}
                          >
                            {step.step}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {step.date}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Live Map/Route Panel */}
              <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 mb-6 border border-gray-800 shadow-lg relative overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold font-spaced text-white">Live Route</h2>
                  <button className="bg-gray-800/70 hover:bg-gray-700/70 p-2 rounded-full transition">
                    <RefreshIcon className="h-5 w-5 text-cyan-400" />
                  </button>
                </div>
                {/* Cyber-style map background */}
                <div className="h-64 relative rounded-xl overflow-hidden">
                  {/* Map grid background */}
                  <div
                    className="absolute inset-0 bg-gray-900"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle, rgba(34, 211, 238, 0.05) 1px, transparent 1px),
                        linear-gradient(to right, rgba(34, 211, 238, 0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(34, 211, 238, 0.05) 1px, transparent 1px)
                      `,
                      backgroundSize: '30px 30px, 15px 15px, 15px 15px',
                    }}
                  ></div>
                  {/* Route line */}
                  <div className="absolute left-1/4 top-1/2 w-1/2 h-px bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                  {/* Origin pin */}
                  <div className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                    <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-xs text-cyan-400 whitespace-nowrap">
                      Surat
                    </div>
                  </div>
                  {/* Current position pin */}
                  <div className="absolute left-[58%] top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                    </div>
                    <div className="absolute top-7 left-1/2 transform -translate-x-1/2 text-xs text-cyan-400 font-medium whitespace-nowrap">
                      Kanpur
                    </div>
                  </div> 
                  {/* Destination pin */}
                  <div className="absolute left-3/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 rounded-full bg-gray-400 shadow-[0_0_5px_rgba(255,255,255,0.3)]"></div>
                    <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap">
                      Silchar
                    </div>
                  </div>
                </div>
                <div className="text-xs font-spaced text-gray-400 mt-3 text-right">
                  <span>Updates every day</span>
                </div>
              </div>
              {/* Activity Log Panel */}
              <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 border border-gray-800 shadow-lg">
                <h2 className="text-lg font-bold font-spaced text-white mb-4">
                  Activity Log
                </h2>
                <div className="overflow-hidden">
                  {shipmentData.activity.map((item, index) => (
                    <div
                      key={index}
                      className={`py-3 flex items-start ${index !== shipmentData.activity.length - 1 ? 'border-b border-gray-800/80' : ''}`}
                    >
                      <div className="mr-4">
                        <div className="text-cyan-400 font-medium">
                          {item.time}
                        </div>
                        <div className="text-xs text-gray-500">{item.date}</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-200">{item.event}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              {/* Courier Details Card */}
              <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 mb-6 border border-gray-800 shadow-lg">
                <h2 className="text-lg font-bold font-spaced text-white mb-4">
                  Courier Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Courier</div>
                    <div className="font-medium">
                      {shipmentData.courier.name}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">
                      Tracking ID
                    </div>
                    <div className="font-medium">
                      {shipmentData.courier.trackingId}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">
                      Assigned Bot
                    </div>
                    <div className="font-medium flex items-center">
                      {shipmentData.courier.bot}
                      <div className="ml-2 h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-cyan-600 font-spaced hover:to-blue-700 transition duration-300 flex items-center justify-center mb-3">
                      <MessageIcon className="h-4 w-4 mr-2 " />
                      Ping Courier Bot
                    </button>
                    <a
                      href="mailto:nerds@nits.ac.in"
                      className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center justify-center transition-colors"
                    >
                      <MailIcon className="h-4 w-4 mr-1" />
                      Email Support
                    </a>
                  </div>
                </div>
              </div>
              {/* Shipment Details Card */}
              <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 mb-6 border border-gray-800 shadow-lg">
                <h2 className="text-lg font-bold font-spaced text-white mb-4">
                  Shipment Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-400 font-spaced text-sm mb-2">Items</div>
                    <div className="space-y-2">
                      {shipmentData.items.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <ShirtIcon className="h-5 w-5 rounded bg-transparent  mr-2 flex-shrink-0"></ShirtIcon>
                          <div className="flex-1">
                            <div className="text-sm">{item.name}</div>
                          </div>
                          <div className="text-sm  text-gray-400">
                            ×{item.qty}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-gray-400 font-spaced text-sm mb-1">Weight</div>
                      <div className="font-medium">{shipmentData.weight}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 font-spaced text-sm mb-1">
                        Dimensions
                      </div>
                      <div className="font-medium">
                        {shipmentData.dimensions}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 font-spaced text-sm mb-1">Payment</div>
                    <div className="font-medium flex items-center">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1" />
                      Pre-approved
                    </div>
                  </div>
                </div>
              </div>
              {/* Shipping Address Card */}
              <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 border border-gray-800 shadow-lg">
                <h2 className="text-lg font-bold font-spaced text-white mb-4">
                  Shipping Address
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <UserIcon className="h-5 w-5 text-cyan-400 mr-2 mt-0.5" />
                    <div>
                      <div className="font-medium">
                        {shipmentData.recipient.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <PhoneIcon className="h-5 w-5 text-cyan-400 mr-2 mt-0.5" />
                    <div>
                      <div className="font-medium">
                        {shipmentData.recipient.phone}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <LocationIcon className="h-5 w-5 text-cyan-400 mr-2 mt-0.5" />
                    <div>
                      <div className="font-medium">
                        {shipmentData.recipient.address}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer */}
          <footer className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-4 mt-6 border border-gray-800 shadow-lg flex flex-wrap justify-between items-center">
            <div className="flex space-x-4">
              <a
                href="/contact"
                className="text-gray-400 font-spaced hover:text-cyan-400 transition-colors"
              >
                FAQ
              </a>
              <a
                href="/contact"
                className="text-gray-400  hover:text-cyan-400 transition-colors flex items-center"
              >
                <AlertIcon className="h-4 w-4 mr-1" />
                Report issue
              </a>
            </div>
            <div className="flex items-center mt-4 sm:mt-0">
              <span className="text-gray-400 mr-2 font-spaced text-sm">Notify me</span>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${notifyEnabled ? 'bg-cyan-500' : 'bg-gray-700'}`}
                onClick={() => setNotifyEnabled(!notifyEnabled)}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifyEnabled ? 'translate-x-6' : 'translate-x-1'}`}
                />
              </button>
              <BellIcon
                className={`h-4 w-4 ml-2 ${notifyEnabled ? 'text-cyan-400' : 'text-gray-500'}`}
              />
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Track_order;