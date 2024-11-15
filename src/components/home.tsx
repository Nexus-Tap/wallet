/**
 * v0 by Vercel.
 * @see https://v0.dev/t/V8XkD88BSfR
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card";

function Badge({ children }: { children: React.ReactElement }) {
  return <div>{children}</div>;
}

function Button({ children }: { children: React.ReactElement }) {
  return (
    <button className="w-full flex items-center justify-center bg-gradient-to-r from-green-400 to-purple-400 py-2 px-4 mb-10 rounded-md text-white font-semibold">
      {children}
    </button>
  );
}

export default function HomeComp() {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <header className="flex items-center justify-between mb-4">
        {/* <Avatar>
          <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}
        <BellIcon className="w-6 h-6 text-white" />
      </header>
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Portfolio Balance</h1>
        <div className="flex items-center">
          <span className="text-4xl font-bold">$12550.50</span>
          <Badge variant="default" className="ml-2 bg-green-500 text-black">
            +10.75%
          </Badge>
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">My Portfolio</h2>
        <Button variant="outline" className="text-green-500 border-green-500">
          Monthly
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* <Card className="bg-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BitcoinIcon className="w-6 h-6 text-yellow-500" />
              <span className="ml-2">Bitcoin</span>
            </CardTitle>
            <CardDescription>BTC</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">$6780</div>
            <p className="text-green-500">+11.75%</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <EclipseIcon className="w-6 h-6 text-blue-500" />
              <span className="ml-2">Ethereum</span>
            </CardTitle>
            <CardDescription>BTC</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">$1478.10</div>
            <p className="text-green-500">+2.75%</p>
          </CardContent>
        </Card> */}
      </div>
      <div className="bg-green-500 text-black p-4 rounded-lg mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Refer Rewards</h3>
            <p>Earn 5$ rewards on every successful refer</p>
          </div>
          <HandshakeIcon className="w-10 h-10" />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Market Statistics</h2>
        <div className="flex justify-between mb-4">
          <Button variant="outline" className="text-white">
            24 hrs
          </Button>
          <Button variant="outline" className="text-white">
            Hot
          </Button>
          <Button variant="outline" className="text-white">
            Profit
          </Button>
          <Button variant="outline" className="text-white">
            Rising
          </Button>
          <Button variant="outline" className="text-white">
            Loss
          </Button>
          <Button variant="outline" className="text-white">
            Top Gain
          </Button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <WalletCardsIcon className="w-6 h-6 text-blue-500" />
              <span className="ml-2">Cardano</span>
              <Badge
                variant="default"
                className="ml-2 bg-gray-700 text-gray-400"
              >
                ADA
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">$123.77</div>
              <p className="text-green-500">+11.75%</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <WalletIcon className="w-6 h-6 text-pink-500" />
              <span className="ml-2">Uniswap</span>
              <Badge
                variant="default"
                className="ml-2 bg-gray-700 text-gray-400"
              >
                LTC
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">$16.96</div>
              <p className="text-red-500">-11.75%</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Tally2Icon className="w-6 h-6 text-green-500" />
              <span className="ml-2">Tether</span>
              <Badge
                variant="default"
                className="ml-2 bg-gray-700 text-gray-400"
              >
                USDT
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">$0.98</div>
              <p className="text-green-500">+0.5%</p>
            </div>
          </div>
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 right-0 flex justify-around bg-gray-900 p-4">
        <Button variant="ghost">
          <HomeIcon className="w-6 h-6 text-white" />
        </Button>
        <Button variant="ghost">
          <BarChartIcon className="w-6 h-6 text-white" />
        </Button>
        <Button variant="ghost">
          <CirclePlusIcon className="w-6 h-6 text-white" />
        </Button>
        <Button variant="ghost">
          <BellIcon className="w-6 h-6 text-white" />
        </Button>
        <Button variant="ghost">
          <SettingsIcon className="w-6 h-6 text-white" />
        </Button>
      </footer>
    </div>
  );
}

function BarChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function BitcoinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
    </svg>
  );
}

function CirclePlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );
}

function EclipseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a7 7 0 1 0 10 10" />
    </svg>
  );
}

function HandshakeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function Tally2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4v16" />
      <path d="M9 4v16" />
    </svg>
  );
}

function WalletCardsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" />
      <path d="M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21" />
    </svg>
  );
}

function WalletIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}
