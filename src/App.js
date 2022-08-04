import React from 'react';
import { BiCalendar, BiTrash } from "react-icons/bi"
import Search from './components/Search';
import AddAppointment from './components/AddAppointment';
import AppointmentInfo from './components/AppointmentInfo';
import {useState, useCallback, useEffect} from 'react';

function App() {
  
  let [query, setQuery] = useState("");
  let [appointmentList, setAppointmentList] = useState([]);
  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");
  
  const filterAppointment = appointmentList.filter( item => {
    return (
      item.petName.toLowerCase().includes(query.toLowerCase())||
      item.ownerName.toLowerCase().includes(query.toLowerCase())||
      item.aptNotes.toLowerCase().includes(query.toLowerCase())
    )
  }).sort((a,b) => {
    let order = (orderBy === 'asc') ? 1 : -1
    return (
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? -1 * order : 1 * order
    )

  });

  const fetchData = useCallback(() => {
    fetch('./data.json')
    .then(response => response.json()
    .then(data => {
      setAppointmentList(data);
    })
  )}, []);

  useEffect(() => {
    fetchData();
  }, [fetchData])

  return (
    <div className='App container mx-8 m-8 font-thin'>
      <h1 className='text-5xl mb-3'>
        <BiCalendar className='inline-block text-red-400 align-top' />The application</h1>
      <AddAppointment
        onSendAppointment={myAppointment => setAppointmentList([...appointmentList, myAppointment])}
        lastId = {appointmentList.reduce((max, item) => Number(item.id) > max ? item : max, 0)}
      />
      <Search query={query} 
      setQueryChange = {(myEvent) => setQuery(myEvent)}
      orderBy = {orderBy}
      onOrderByChange = {myOrder => setOrderBy(myOrder)}
      sortBy = {sortBy}
      onSortByChange = {mySort => setSortBy(mySort)}
      />
      <ul className='divide-y divide-gray-200'>
        {filterAppointment.map(appointment => (
          <AppointmentInfo key={appointment.id}
            appointment = {appointment} 
            onDeleteAppointment = {
              appointmentId => 
              setAppointmentList(appointmentList.filter(value => value.id !== appointmentId))}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
