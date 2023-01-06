import { useState, useContext } from "react";
import { Context } from "../context/ContextProvider";
import { clean } from "xss-clean/lib/xss";
import axios from "axios";

function LinkForm() {
  const { docs, setDocs } = useContext(Context);
  const [link, setLink] = useState("");
  const [isValid, setIsValid] = useState(null);

  const handleLink = async (e) => {
    try {
      let input = e.target.value.trim();
      if (!input) return;

      const sanitizedLink = await clean(input);

      const response = await axios.post("/api/validate", {
        incomingLink: sanitizedLink,
      });

      if (response.data.success) {
        setLink(sanitizedLink);
        setIsValid(true);
      } else {
        setIsValid(false);
        alert(
          "The URL you have entered is not accepted in this app. Please enter a different link address."
        );
      }
    } catch (err) {
      console.log("Error on handleLink: ", err.message);
      setIsValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const shortId = Math.random().toString(36).substring(2, 8);

      if (link && docs.find((doc) => doc.originalUrl === link))
        return alert("This link already exists in your list.");

      const sanitizedLink = await clean(link);

      if (link && isValid) {
        const response = await axios.post("/api/add", {
          originalUrl: sanitizedLink,
          shortUrl: shortId,
        });

        setDocs((prevDocs) => [...prevDocs, response.data.newLink]);
        document.getElementById("userInput").value = "";
      } else {
        alert("Please enter a URL.");
      }
    } catch (err) {
      console.log("Error on handleSubmit: ", err.message);
    }
  };

  return (
    <div>
      <form>
        <div className="bg-indigo-50 md:px-20 py-6">
          <div className=" bg-white rounded-md px-6 py-3 max-w-xl mx-auto">
            <div className="flex flex-col space-y-4">
              <div>
                <textarea
                  onBlur={handleLink}
                  id="userInput"
                  rows="2"
                  placeholder="Insert full URL to be shortened, starting with https://... or http://..."
                  className="w-full py-1 px-2 text-gray-600 bg-indigo-50 outline-none rounded-md"
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                className="px-6 py-1 mx-auto block rounded-md text-sm font-semibold text-indigo-100 bg-indigo-600"
              >
                SHORTEN LINK
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LinkForm;
