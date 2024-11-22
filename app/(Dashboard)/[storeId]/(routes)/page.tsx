import DashboardChart from "@/components/DashboardChart/DashboardChart";
import HeadingComponent from "@/components/HeadingComponent/HeadingComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Store, Wallet2 } from "lucide-react";

interface dashBoardProps {
  params: {
    storeId: string;
  };
}
const Dashboard: React.FC<dashBoardProps> = async ({ params }) => {
  return (
    <div className="px-10 my-10 w-full">
      <HeadingComponent title="Dashboard" descriptons="overview of your shop" />
      <div className="mt-10 w-full gap-10 flex">
        <Card className="max-w-[20rem] w-full">
          <CardHeader>
            <CardTitle className="text-sm flex items-center justify-between">
              <p>Total Revenue</p>
              <DollarSign size={18} color="#808080" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-bold">100$</h3>
          </CardContent>
        </Card>
        <Card className="max-w-[20rem] w-full ">
          <CardHeader>
            <CardTitle className="text-sm flex justify-between items-center gap-x-5">
              <p>Sales</p>
              <Wallet2 size={18} color="#808080" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-bold">5</h3>
          </CardContent>
        </Card>
        <Card className="max-w-[20rem] justify-between w-full">
          <CardHeader>
            <CardTitle className="text-sm flex items-center justify-between gap-x-5">
              <p>Product Stock</p>
              <Store size={18} color="#808080" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-bold">20+</h3>
          </CardContent>
        </Card>
      </div>
      <Card className="chart mb-20 mt-20">
        <CardHeader>
          <CardTitle className="mb-10">Overview of sales</CardTitle>
        </CardHeader>
        <CardContent>
          <DashboardChart />
        </CardContent>
      </Card>
    </div>
  );
};
export default Dashboard;
