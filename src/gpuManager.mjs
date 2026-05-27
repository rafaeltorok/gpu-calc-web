import { GPU } from "./gpu.mjs";


// The array that serves as a database while the app is running
let gpuList = [];

// Fetch all GPU objects from the database file during the app start
export async function getData() {
    const response = await fetch('/gpus');
    const data = await response.json();
    for (const item of data) {
        gpuList.push(new GPU(
            item['manufacturer'], 
            item['line'], 
            item['model'],
            item['cores'],
            item['tmus'],
            item['rops'],
            item['vram'],
            item['bus'],
            item['memtype'],
            item['baseclock'],
            item['boostclock'],
            item['memclock']
        ));
    }
}


// Fetch a GPU object from the gpuList Array
export function getGPUFromDatabase(searchInput) {
    const gpu = gpuList.find(
        gpu => gpu.getModel().toLowerCase().replace(/\s+/g, '') === searchInput.toLowerCase().replace(/\s+/g, '')
    );
    return gpu;
}


// Fetch all cards from the database
export function getGPUList() {
    return gpuList;
}


// Format all data into JSON to store in the database file
export function formatGpuListIntoJsonString() {
    const dataList = [];
    for (const gpu of gpuList) {
        dataList.push(
            {
                manufacturer: gpu.getManufacturer(),
                line: gpu.getLine(),
                model: gpu.getModel(),
                cores: gpu.getCores(),
                tmus: gpu.getTmus(),
                rops: gpu.getRops(),
                vram: gpu.getVram(),
                bus: gpu.getBus(),
                memtype: gpu.getMemType(),
                baseclock: gpu.getBaseClock(),
                boostclock: gpu.getBoostClock(),
                memclock: gpu.getMemClock()
            }
        );
    }
    return dataList;
}
