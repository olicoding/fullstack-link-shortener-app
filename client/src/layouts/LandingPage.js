import LinkForm from "../components/LinkForm";
import Dashboard from "../components/Dashboard";

function LandingPage() {
  return (
    <div>
      <div className=" mx-auto space-y-6">
        <h2 className="flex flex-row flex-nowrap items-center my-8">
          <span
            className="flex-grow block border-t border-black"
            aria-hidden="true"
            role="presentation"
          ></span>
          <span className="flex-none block mx-4 px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
            Link Shortener
          </span>
          <span
            className="flex-grow block border-t border-black"
            aria-hidden="true"
            role="presentation"
          ></span>
        </h2>
      </div>
      <LinkForm />
      <Dashboard />
    </div>
  );
}

export default LandingPage;
