// import { PortSchema } from "../models/ports";
// import { IPortDocument } from "../types/ports";
// import { model } from "mongoose";
// import { connect, disconnect } from "../configs/database"

// const PortModel = model<IPortDocument>("user", PortSchema);

// (async () => {
//   connect();
// const ports = [
//     {country: "AL", location: "ROM", name: "Romano Port", coordinates: [19.416667, 41.366667]},
//     {
//         country: "AT",
//         location: "BRD",
//         name: "Brand",
//         coordinates: [9.733333, 47.1]
//     },
//     {
//         country: "FR",
//         location: "GRX",
//         name: "Greux",
//         coordinates: [48.45, -5.683333]
//     },
//     {
//         country: "NL",
//         location: "AMS",
//         name: "Amsterdam",
//         coordinates: [52.4, -4.816667]
//     },
//     {
//         country: "IT",
//         location: "LL8",
//         name: "Gallignano",
//         coordinates: [45.433333, -9.833333]
//     },
//   ];
// try {
//     for (const port of ports) {
//       await PortModel.create(port);
//       console.log(`Created user ${port.country} ${port.location}`);
//     }
// disconnect();
//   } catch (e) {
//     console.error(e);
//   }
// })();