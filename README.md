# Naviate

The ultimate flight simulation toolkit.

## License

Naviate is dual-licensed with anyone able to use the software per AGPLv3 and
licensed to Eigently under the MIT License.
This is detailed in [`LICENSE.md`](./LICENSE.md).

It is important that any derivative works of this project release their source code in their entirety.

## Project Structure

| Directory            | Description                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------- |
| `client`             | Web frontend client (i.e. [https://www.naviate.xyz](https://www.naviate.xyz))                 |
| `server`             | Core server that frontend client queries                                                      |
| `scds_d_atis_pubsub` | Microservice that subscribes to the SCDS PubSub for D-ATIS Data and persists to a Postgres DB |
