import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from 'reactstrap';
import Loader from "../components/loading"
import { useQuery } from "react-query";
import { getCapsules } from "../remote";
import Error from "../components/Error";
import Filter from "../components/Filter";
import CapsuleModal from "../components/Modal";

const Capsules: React.FC<{}> = () => {
  const { page } = useParams()
  const navigate = useNavigate()
  const [filter, setFilter] = useState({ date: "", status: "", type: "" })
  const [modal, setModal] = useState({ isOpen: false, data: {} })
  const { data, status, error } = useQuery(['getCapsules', page, filter], () => getCapsules(page || 0, filter))

  if (status === 'loading') return <Loader />
  if (error) return <Error error={error} />

  return (
    <>
      <CapsuleModal modalData={modal.data} isModalOpen={modal.isOpen} onClose={() => setModal({ isOpen: false, data: {} })} />
      <header className="absolute flex items-center justify-between p-5 w-full">
        <Button className='font-bold tracking-widest uppercase bg-transparent' onClick={() => navigate('/home')}>⬅️ Home</Button>
        <Filter value={filter} setFilter={setFilter} />
      </header>
      <section className="py-32">
        <h1 className="heading text-center mb-10">Capsules</h1>
        <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
          {data ? data.docs.length !== 0 ? data.docs.map(
            (item: any) => (
              <article onClick={() => setModal({ isOpen: true, data: item })} key={item.id} className="articles cursor-pointer">
                <h2 className="text-xl font-bold mb-5">
                  {item.type},{" "}
                  <span className="text-base opacity-75 font-light">
                    {item.serial}
                  </span>
                </h2>
                <ul>
                  <li className="mb-1">{item.launches.length} launches</li>
                  <li className="mb-1">{item.land_landings} land landings</li>
                  <li className="mb-1">{item.water_landings} water landings</li>
                  <li className="mb-1">Reused {item.reuse_count} times</li>
                  {item.status === "active" ? (
                    <li className="text-emerald-500">Active</li>
                  ) : (
                    <li className="text-rose-500">{item.status}</li>
                  )}
                </ul>
                <p className="mt-5 opacity-75">{item.last_update}</p>
              </article>
            )
          ) : <span className="text-rose-500">No Results 😟</span> : <span className="text-rose-500">Something went Wrong 😟</span>}
        </div>
      </section>
      {data && <div className="flex items-center justify-between p-5 w-full">
        {data.hasPrevPage && <Button className='font-bold tracking-widest uppercase bg-transparent' onClick={() => navigate(`/capsules/${data.prevPage}`)}>⬅️ Previous</Button>}
        {data.hasNextPage && <Button className='font-bold tracking-widest uppercase bg-transparent' onClick={() => navigate(`/capsules/${data.nextPage}`)}>Next ➡️</Button>}
      </div>}
    </>
  )
}

export default Capsules