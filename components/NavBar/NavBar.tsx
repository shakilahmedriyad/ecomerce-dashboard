import { UserButton } from "@clerk/nextjs";

export default function NavBar() {
  return (
    <div className="flex px-5 py-7 justify-between">
      <div className="flex space-x-3">
        <div>button for store</div>
        <div>button for create store</div>
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  );
}
