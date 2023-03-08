import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap';
import { QueryFilter } from '../remote/type';

interface FilterProps {
    setFilter: (state: any) => void
    value: QueryFilter
}
const Filter: React.FC<FilterProps> = ({ setFilter, value }) => {
    const status = ['active', 'inactive', 'retired', 'unknown']
    const types = ['Dragon 1.0', 'Dragon 1.1', 'Dragon 2.0']
    return (
        <div className="flex gap-1 item-center">
            <label className='font-bold text-white items-center cursor-pointer flex tracking-widest uppercase bg-transparent' onClick={() => setFilter((s: any) => ({ type: "", date: "", status: "" }))}>Clear 🔄</label>
            <FormGroup className="mb-0">
                <Label className="text-white" for="datetimeSelect">
                    Time
                </Label>
                <Input
                    id="datetimeSelect"
                    name="datetime"
                    placeholder="datetime placeholder"
                    type="datetime-local"
                    value={value.date}
                    onChange={(e) => setFilter((s: any) => ({ ...s, date: e.target.value }))}
                />
            </FormGroup>
            <FormGroup className="mb-0">
                <Label className="text-white" for="statusSelect">
                    Status
                </Label>
                <Input
                    id="statusSelect"
                    name="statusSelect"
                    type="select"
                    defaultValue='Select Status'
                    value={value.status}
                    onChange={(e) => setFilter((s: any) => ({ ...s, status: e.target.value }))}
                >
                    {status.map((item, idx) => (
                        <option value={item} key={idx}>
                            {item}
                        </option>
                    ))}
                </Input>
            </FormGroup>
            <FormGroup className="mb-0">
                <Label className="text-white" for="typeSelct">
                    Type
                </Label>
                <Input
                    id="typeSelct"
                    name="typeSelct"
                    type="select"
                    defaultValue='Select Type'
                    value={value.type}
                    onChange={(e) => setFilter((s: any) => ({ ...s, type: e.target.value }))}
                >
                    {types.map((item, idx) => (
                        <option value={item} key={idx}>
                            {item}
                        </option>
                    ))}
                </Input>
            </FormGroup>
        </div>
    )
}

export default Filter