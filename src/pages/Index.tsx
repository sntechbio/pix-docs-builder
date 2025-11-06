import { useState } from "react";
import { ApiDocHeader } from "@/components/ApiDocHeader";
import { ApiSidebar } from "@/components/ApiSidebar";
import { EndpointDetail } from "@/components/EndpointDetail";
import { endpoints } from "@/data/endpoints";

const Index = () => {
  const [activeEndpoint, setActiveEndpoint] = useState(endpoints[0].id);
  
  const currentEndpoint = endpoints.find(e => e.id === activeEndpoint);

  return (
    <div className="min-h-screen bg-background">
      <ApiDocHeader />
      <div className="flex">
        <ApiSidebar 
          activeEndpoint={activeEndpoint} 
          onEndpointSelect={setActiveEndpoint}
        />
        <main className="ml-72 flex-1 p-8 pt-8">
          <div className="max-w-4xl">
            {currentEndpoint && <EndpointDetail endpoint={currentEndpoint} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
