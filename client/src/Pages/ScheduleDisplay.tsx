import React from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_GET_EVENTS } from '../utils/queries';
import { DELETE_EVENT } from '../utils/mutations';
import Event from '../interfaces/Event';

const EventTable: React.FC = () => {
  const { data, loading, error, refetch } = useQuery(QUERY_GET_EVENTS);
  const [deleteEvent] = useMutation(DELETE_EVENT);

  const handleDelete = async (eventId: string) => {
    try {
      await deleteEvent({ variables: { eventId } });
      message.success('Event deleted successfully');
      refetch(); // Refresh the list
    } catch (err) {
      message.error('Failed to delete event');
      console.error(err);
    }
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Time', dataIndex: 'time', key: 'time' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Event) => (
        <Popconfirm
          title="Are you sure to delete this event?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events.</p>;

  return (
    <Table
			className="custom-event-table"
      dataSource={data?.getEvents || []}
      columns={columns}
      rowKey="_id"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default EventTable;