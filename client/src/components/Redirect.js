import axios from "axios";
import { useEffect } from "react";

function Redirect({ doc }) {
  useEffect(() => {
    const fetchLink = async () => {
      try {
        const { data } = await axios.get(`/api/redirect/${doc.shortUrl}`);

        window.location.replace(data.redirectUrl);
      } catch (err) {
        console.error("Error on handleRedirect: ", err.message);
      }
    };

    fetchLink();
  }, [doc]);

  return null;
}

export default Redirect;
