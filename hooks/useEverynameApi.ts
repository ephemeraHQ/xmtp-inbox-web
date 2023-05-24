import { useState, useEffect } from "react";

type ResolutionResult = {
    address: string;
    name: string;
};

const useEverynameApi = (
    domainName?: string,
    walletAddress?: string,
): ResolutionResult | null => {
    const [resolutionResult, setResolutionResult] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (domainName) {
                try {
                    const response = await fetch(
                        `https://api.everyname.xyz/forward?domain=${domainName}`,
                        {
                            headers: {
                                Accept: "application/json",
                                "api-key":
                                    "c63a12d94766047def2989399eff037d56b99a71c6129c3adf31f231f0ae9ba3", //temporary 15-min api key hardcoded for now
                            },
                        },
                    );
                    const data = await response.json();
                    const { address } = data;
                    setResolutionResult({ address, domainName });
                } catch (error) {
                    console.log(error);
                }
            } else if (walletAddress) {
                try {
                    const response = await fetch(
                        `https://api.everyname.xyz/reverse?address=${walletAddress}&network=eth`,
                        {
                            headers: {
                                Accept: "application/json",
                                "api-key":
                                    "c63a12d94766047def2989399eff037d56b99a71c6129c3adf31f231f0ae9ba3", //temporary 15-min api key hardcoded for now
                            },
                        },
                    );
                    const data = await response.json();
                    const { domain } = data;
                    setResolutionResult({ walletAddress, domain });
                } catch (error) {
                    console.log(error);
                }
            }
        };

        fetchData();
    }, [domainName, walletAddress]);

    return resolutionResult;
};

export default useEverynameApi;
