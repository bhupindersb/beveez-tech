<tbody>
  {leads.map((lead) => (
    <tr
      key={lead.id}
      className="border-b hover:bg-gray-50 transition"
    >
      <td className="py-4 font-medium">
        {lead.name}
      </td>

      <td>{lead.email}</td>

      <td>
        <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
          {lead.plan}
        </span>
      </td>

      <td>
        <span className={`px-3 py-1 text-xs rounded-full ${
          lead.status === 'new'
            ? 'bg-yellow-100 text-yellow-600'
            : lead.status === 'contacted'
            ? 'bg-blue-100 text-blue-600'
            : 'bg-green-100 text-green-600'
        }`}>
          {lead.status}
        </span>
      </td>

      <td>
        {new Date(lead.createdAt).toLocaleDateString()}
      </td>
    </tr>
  ))}
</tbody>
