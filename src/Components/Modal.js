
export const Modal = ({ onChange }) => (
    <div className="filter-wrapper">
        <select name="height" className="filter-height" onChange={onChange}>
            <option value="0">select height</option>
            <option value="100">More than 100 ft</option>
            <option value="200">More than 200 ft</option>
            <option value="300">More than 300 ft</option>
            <option value="400">More than 400 ft</option>
        </select>
    </div>

);