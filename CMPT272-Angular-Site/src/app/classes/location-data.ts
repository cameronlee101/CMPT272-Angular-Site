export class LocationData {
    public reports:number = 1
    constructor(public name:string, public latitude:number, public longitude:number) {

    }

    static getLocationList():LocationData[] {
        // TODO: GET from server
        return [
            new LocationData('Vancouver', 49.28356307995918, -123.12286044240237),
            new LocationData('Burnaby', 49.2494648613246, -122.9813979941102),
            new LocationData('New Westminster', 49.210002318495455, -122.90813212632467),
            new LocationData('Richmond', 49.16624261865594, -123.13370172567643),
            new LocationData('Surrey', 49.1931754676304, -122.85413964053254),
            new LocationData('North Vancouver', 49.320804303364575, -123.07323427822436),
            new LocationData('Coquitlam', 49.2837408538731, -122.79339969365776)
        ].sort((a, b) => (a.name.localeCompare(b.name)))
    }

    static addNewLocation(name:string, latitude:number, longitude:number) {
        // TODO: PUT to server

    }
}