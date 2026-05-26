import { useEffect } from "react";

function PharmaNestAI() {

  useEffect(() => {

    // LOAD SCRIPT ONLY ONCE
    const existingScript = document.querySelector(
      'script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");

      script.src =
        "https://unpkg.com/@elevenlabs/convai-widget-embed";

      script.async = true;

      script.type = "text/javascript";

      document.body.appendChild(script);
    }

  }, []);

  return (

    <div className="fixed bottom-6 right-6 z-[9999]">

      <elevenlabs-convai
        agent-id="agent_6301kshqxbcae0qsewngvz3xt3zs"
      ></elevenlabs-convai>

    </div>
  );
}

export default PharmaNestAI;