import { extendConfig, extendEnvironment } from "hardhat/config";
import { lazyObject } from "hardhat/plugins";
import { HardhatConfig, HardhatUserConfig } from "hardhat/types";
import AdminClients from "./OpenzeppelinDefender/AdminClient";

// This import is needed to let the TypeScript compiler know that it should include your type
// extensions in your npm package's types file.
import "./type-extensions";
import AutotaskClients from "./OpenzeppelinDefender/AutotaskClient";
import RelayClients from "./OpenzeppelinDefender/RelayClient";
import SentinelClients from "./OpenzeppelinDefender/SentinelClient";
import Utils from "./OpenzeppelinDefender/Utils";
import KvstoreClients from "./OpenzeppelinDefender/KvstoreClient";

extendConfig(
  (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
  }
);

extendEnvironment((hre) => {
  hre.OpenzeppelinDefender = lazyObject(() => {
    
    const AdminClient = new AdminClients(
      hre.config.OpenzeppelinDefenderCredential
    );

    const AutoTaskClint = new AutotaskClients(
      hre.config.OpenzeppelinDefenderCredential
    );

    const RelayClient = new RelayClients(
      hre.config.OpenzeppelinDefenderCredential
    );
    
    const SentinelClient = new SentinelClients(
      hre.config.OpenzeppelinDefenderCredential
    );

    const KvstoreClient = new KvstoreClients();

    const Util = new Utils();

    return {
      AdminClient,
      AutoTaskClint,
      RelayClient,
      SentinelClient,
      KvstoreClient,
      Utils: Util,
    };
  });
});
