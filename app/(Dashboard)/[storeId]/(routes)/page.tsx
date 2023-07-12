interface dashBoardProps {
  params: {
    storeId: string;
  };
}
const Dashboard: React.FC<dashBoardProps> = async ({ params }) => {
  return <div>this is dashboard</div>;
};
export default Dashboard;
