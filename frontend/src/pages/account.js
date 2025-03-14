import Navbar from "@/components/Navbar";

export default function Account() {
  return (
    <div className="container-fluid p-0"> 
      {/* Full-width Navbar */}
      <div className="w-100">
        <Navbar />
      </div>

      {/* Centered Content */}
      <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
        <h1 className="text-primary">This is Your Account Page</h1>
        <p className="text-muted">Manage your Account Settings Here.</p>
      </div>
    </div>
  );
}
