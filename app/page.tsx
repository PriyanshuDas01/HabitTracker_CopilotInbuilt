import Index from "./pages/index"
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css"


export default function Home() {
  return (
    <CopilotKit publicApiKey="ck_pub_9f0bfffcbd89f7d3932e7df252d25779">
      <Index />
      <CopilotPopup />
      </CopilotKit>
  );
}
