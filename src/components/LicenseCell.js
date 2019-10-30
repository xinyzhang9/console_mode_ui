import React from 'react';
export default function LicenseCell(props) {
    return (
        <tr>
        <td>{props.name}</td>
        <td>{props.publisher}</td>
        <td>{props.code}</td>
        <td>{props.metric}</td>
        </tr>
    )
}