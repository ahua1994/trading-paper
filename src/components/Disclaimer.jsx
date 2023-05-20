import "./Disclaimer.scss";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const Disclaimer = () => {
    return (
        <div className="Disclaimer">
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Read Our Terms Before Use</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Disclaimer: The following is a disclaimer for the paper trading web app
                        developed by Andy Hua. Please read this disclaimer carefully before using
                        the application.
                    </Typography>
                    <ol>
                        <li>
                            No Financial Advice: The paper trading web app is designed for
                            educational and informational purposes only. It does not provide
                            financial advice or recommendations. The content and functionality of
                            the app should not be construed as professional financial advice. Users
                            are solely responsible for their investment decisions and should consult
                            with a qualified financial advisor before making any investment.
                        </li>
                        <li>
                            Simulated Trading: The paper trading web app provides a simulated
                            trading environment where users can practice trading without using real
                            money. The app uses historical and real-time market data to simulate
                            trading scenarios, but the results achieved in the app may not reflect
                            actual market conditions or real-world trading outcomes.
                        </li>
                        <li>
                            Risk of Loss: Trading, even in a simulated environment, involves risk.
                            Users of the paper trading web app should be aware that investing in
                            financial markets carries inherent risks, including the potential loss
                            of capital. The app does not guarantee profits or protect against
                            losses. Users should trade responsibly and be aware of the risks
                            associated with trading.
                        </li>
                        <li>
                            Accuracy of Information: While every effort has been made to ensure the
                            accuracy of the information provided in the paper trading web app, we
                            cannot guarantee its completeness or accuracy. Market data, stock
                            prices, and other information may be delayed or inaccurate. Users should
                            independently verify any information obtained from the app before making
                            any investment decisions.
                        </li>
                        <li>
                            Limited Exchanges: This web application is currently limited to US
                            market data, due to the constraints of the free-to-use API plans it is
                            utilizing. If you are seeking market data from other countries or
                            regions, we recommend exploring alternative sources that specialize in
                            global market data.
                        </li>
                        <li>
                            Technical Limitations: The paper trading web app may experience
                            technical issues, system failures, or interruptions that are beyond the
                            control of Andy Hua. We cannot guarantee uninterrupted access to the app
                            or the accuracy of its features and functionalities. Users acknowledge
                            and accept the potential for such technical limitations.
                        </li>
                        <li>
                            No Liability: Andy Hua, the developer of the paper trading web app, and
                            any affiliated parties shall not be liable for any losses, damages, or
                            expenses arising from the use of the app. This includes, but is not
                            limited to, financial losses, indirect or consequential damages, or any
                            loss of data.
                        </li>
                    </ol>
                    <Typography>
                        By using the paper trading web app, you acknowledge that you have read and
                        understood this disclaimer and agree to its terms. You also acknowledge and
                        accept the risks associated with trading and investing in financial markets.
                        If you do not agree with this disclaimer, you should refrain from using the
                        paper trading web app. Andy Hua reserves the right to modify or update this
                        disclaimer at any time without prior notice.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default Disclaimer;
