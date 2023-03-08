import React from 'react';
import { useQuery } from 'react-query';
// style
import '../components/style.scss';
import { getSpaceDetails } from '../remote';
import Loader from '../components/loading';
import Error from '../components/Error';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    const { data, status, error } = useQuery('getDetails', { queryFn: getSpaceDetails })

    const navigate = useNavigate()
    if (status === 'loading') return <Loader />;
    if (error) return <Error error={error} />;
    const company = JSON.parse(data)
    return (
        <> 
            <header className="absolute flex items-center justify-end p-5 w-full">
                <Button className='font-bold tracking-widest uppercase bg-transparent' onClick={() => navigate('/capsules/0')}>Capsules ➡️</Button>
            </header>
            <section className="showcase text-gray-900">
                <div className="overlay">
                    <article className="text-white">
                        <h1 className="heading text-center capitalize">
                             The SpaceX For You 🚀
                        </h1>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto mt-10 lg:gap-20 px-5">
                            <article>
                                <h2 className="font-bold border-b-2 border-white text-xl mb-3 pb-2 uppercase tracking-wider">
                                    About
                                </h2>
                                <ul className="text-sm opacity-75">
                                    <li className="mb-1">{company.name} was founded by</li>
                                    <li className="mb-1">{company.founder} in the year</li>
                                    <li className="mb-1">{company.founded}.</li>
                                    <li className="mb-1">
                                        It has {company.employees} employess,
                                    </li>
                                    <li className="mb-1">{company.vehicles} vehicles,</li>
                                    <li className="mb-1">
                                        {company.launch_sites} launch sites,
                                    </li>
                                    <li className="mb-1">
                                        and {company.test_sites} test sites and
                                    </li>
                                    <li className="mb-1">
                                        is valued at {company.valuation.toLocaleString()} B
                                    </li>
                                </ul>
                            </article>

                            <article>
                                <h2 className="font-bold border-b-2 border-white text-xl mb-3 pb-2 uppercase tracking-wider">
                                    Headquarters
                                </h2>
                                <ul className="text-sm opacity-75">
                                    <li className="mb-1">{company.headquarters.address}</li>
                                    <li className="mb-1">{company.headquarters.city}</li>
                                    <li className="mb-1">{company.headquarters.state}</li>
                                </ul>
                            </article>

                            <article>
                                <h2 className="font-bold border-b-2 border-white text-xl mb-3 pb-2 uppercase tracking-wider">
                                    Useful Links
                                </h2>
                                <ul className="text-sm opacity-75">
                                    <li className="mb-1">
                                        <a href={company.links.website}>Website</a>
                                    </li>
                                    <li className="mb-1">
                                        <a href={company.links.flickr}>Flickr</a>
                                    </li>
                                    <li className="mb-1">
                                        <a href={company.links.twitter}>Twitter</a>
                                    </li>
                                    <li className="mb-1">
                                        <a href={company.links.elon_twitter}>Elon Twitter</a>
                                    </li>
                                </ul>
                            </article>
                        </div>

                        <p className="max-w-3xl mx-auto text-center mt-10">
                            {company.summary}
                        </p>
                    </article>
                </div>
            </section>
        </>
    )
}


export default Home