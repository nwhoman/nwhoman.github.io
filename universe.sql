--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(20) NOT NULL,
    shape character varying(20),
    size numeric,
    distance_from_earth numeric NOT NULL
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(20) NOT NULL,
    planet_id integer NOT NULL,
    description text,
    size numeric
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(20) NOT NULL,
    star_id integer NOT NULL,
    has_moon boolean NOT NULL,
    description text,
    size numeric,
    distance_to_star integer
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(20) NOT NULL,
    star_type_id integer NOT NULL,
    size numeric NOT NULL,
    has_planets boolean NOT NULL,
    galaxy_id integer NOT NULL
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: star_type; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star_type (
    star_type_id integer NOT NULL,
    brightness numeric,
    description text NOT NULL,
    name character varying(20) NOT NULL
);


ALTER TABLE public.star_type OWNER TO freecodecamp;

--
-- Name: star_type_star_type_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_type_star_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_type_star_type_id_seq OWNER TO freecodecamp;

--
-- Name: star_type_star_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_type_star_type_id_seq OWNED BY public.star_type.star_type_id;


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Name: star_type star_type_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star_type ALTER COLUMN star_type_id SET DEFAULT nextval('public.star_type_star_type_id_seq'::regclass);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'Milky Way', 'spiral', 100000, 50000);
INSERT INTO public.galaxy VALUES (2, 'Andromeda', 'barred spiral', 220000, 2500000);
INSERT INTO public.galaxy VALUES (3, 'Black Eye', 'spiral', 53000, 17000000);
INSERT INTO public.galaxy VALUES (4, 'Cigar', 'starburst', 40000, 1200000);
INSERT INTO public.galaxy VALUES (5, 'Bodes', 'spiral', 96000, 1200000);
INSERT INTO public.galaxy VALUES (6, 'Pinwheel', 'cc spiral', 170000, 21000000);


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'Moon', 3, 'Earths moon', 0.02);
INSERT INTO public.moon VALUES (2, 'Phobos', 4, 'Marss moon', 0.0000007);
INSERT INTO public.moon VALUES (3, 'Deimos', 4, 'Marss other moon', 0.00000005);
INSERT INTO public.moon VALUES (5, 'Io', 6, 'Io or Jupiter I, is the innermost and second-smallest of the four Galilean moons of the planet Jupiter', 0.023);
INSERT INTO public.moon VALUES (6, 'Europa', 6, 'Europa or Jupiter II, is the smallest of the four Galilean moons orbiting Jupiter, and the sixth-closest to the planet.', 0.015);
INSERT INTO public.moon VALUES (7, 'Ganymede', 6, 'Ganymede or Jupiter III, is the largest and most massive natural satellite of Jupiter and in the Solar System', 0.07);
INSERT INTO public.moon VALUES (8, 'Callisto', 6, 'Callisto or Jupiter IV, is the second-largest moon of Jupiter, after Ganymede. In the Solar System it is the third-largest moon', 0.05);
INSERT INTO public.moon VALUES (9, 'Metis', 6, 'Metis also known as Jupiter XVI, is the innermost known moon of Jupiter', 0.0000005);
INSERT INTO public.moon VALUES (10, 'Adrastea', 6, 'also known as Jupiter XV, is the second by distance, and the smallest of the four inner moons of Jupiter', 0.000000035);
INSERT INTO public.moon VALUES (11, 'Thebe', 6, 'Thebe also known as Jupiter XIV, is the fourth moon by distance from the planet', 0.00006);
INSERT INTO public.moon VALUES (12, 'Amalthea', 6, 'Amalthea has the third-closest orbit around Jupiter among known moons and was the fifth moon of Jupiter to be discovered, so it is also known as Jupiter V. It is also the fifth-largest moon of Jupiter', 0.0003);
INSERT INTO public.moon VALUES (13, 'Titan', 7, 'Titan is the largest moon of Saturn and the second-largest in the Solar System.', 1.48);
INSERT INTO public.moon VALUES (14, 'Rhea', 7, 'Rhea is the second-largest moon of Saturn and the ninth-largest moon in the Solar System', 0.44);
INSERT INTO public.moon VALUES (15, 'Iapetus', 7, 'Iapetus s the outermost of Saturns large moons. With an estimated diameter of 1,469 km (913 mi), it is the third-largest moon of Saturn and the eleventh-largest in the Solar System', 0.42);
INSERT INTO public.moon VALUES (16, 'Dione', 7, 'Dione  also designated Saturn IV, is the fourth-largest moon of Saturn. With a mean diameter of 1,123 km and a density of about 1.48 g/cm3', 0.32);
INSERT INTO public.moon VALUES (17, 'Tethys', 7, 'Tethys or Saturn III, is the fifth-largest moon of Saturn, measuring about 1,060 km (660 mi) across', 0.3);
INSERT INTO public.moon VALUES (18, 'Enceladus', 7, 'Enceladus is the sixth-largest moon of Saturn and the 19th-largest in the Solar System. It is about 500 kilometers (310 miles) in diameter', 0.14);
INSERT INTO public.moon VALUES (19, 'Mimas', 7, 'Mimas also designated Saturn I, is the seventh-largest natural satellite of Saturn. With a mean diameter of 396.4 kilometres or 246.3 miles, Mimas is the smallest astronomical body known to be roughly rounded in shape due to its own gravity.', 0.12);
INSERT INTO public.moon VALUES (20, 'Titania', 8, 'Titania also designated Uranus III, is the largest moon of Uranus. At a diameter of 1,578 kilometres (981 mi) it is the eighth largest moon in the Solar System, with a surface area comparable to that of Australia', 0.10);
INSERT INTO public.moon VALUES (21, 'Triton', 9, 'Triton is the largest natural satellite of the planet Neptune. It is the only moon of Neptune massive enough to be rounded under its own gravity and hosts a thin but well-structured atmosphere.', 0.47);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 'Mercury', 1, false, 'Mercury is the first planet from the Sun and the smallest in the Solar System.', 0.06, 65);
INSERT INTO public.planet VALUES (2, 'Venus', 1, false, 'Venus is the second planet from the Sun.', 0.86, 109);
INSERT INTO public.planet VALUES (3, 'Earth', 1, true, 'Earth is the third planet from the Sun.', 1.0, 152);
INSERT INTO public.planet VALUES (4, 'Mars', 1, true, 'Mars is the fourth planet from the Sun. The surface of Mars is orange-red because it is covered in iron(III) oxide dust, giving it the nickname "the Red Planet".', 0.151, 250);
INSERT INTO public.planet VALUES (6, 'Jupiter', 1, true, 'Jupiter is the fifth planet from the Sun and largest in the solar system.', 1321, 816);
INSERT INTO public.planet VALUES (7, 'Saturn', 1, true, 'Saturn is the sixth planet from the Sun and second largest in the solar system.', 764, 1514);
INSERT INTO public.planet VALUES (8, 'Uranus', 1, true, 'Uranus is the seventh planet from the Sun. It is a gaseous cyan-coloured ice giant. Most of the planet is made of water, ammonia, and methane in a supercritical phase of matter, which astronomy calls "ice" or volatiles.', 63.1, 3000);
INSERT INTO public.planet VALUES (9, 'Neptune', 1, true, 'Neptune is the eighth planet from the Sun. It is the fourth-largest planet in the Solar System by diameter, the third-most-massive planet, and the densest giant planet.', 57.7, 4500);
INSERT INTO public.planet VALUES (10, 'Pluto', 1, true, 'Pluto is a dwarf planet in the Kuiper belt, a ring of bodies beyond the orbit of Neptune. It is the ninth-largest and tenth-most-massive known object to directly orbit the Sun.', 0.007, 7376);
INSERT INTO public.planet VALUES (12, 'Epsilon Eridani b', 4, false, 'Epsilon Eridani b, also known as AEgir [sic],[4] is an exoplanet approximately 10.5 light-years away orbiting the star Epsilon Eridani, in the constellation of Eridanus (the River).', 1000, 525);
INSERT INTO public.planet VALUES (13, 'Upsilon Andromedae b', 7, false, 'Upsilon Andromedae b (υ Andromedae b, abbreviated Upsilon And b, υ And b), formally named Saffar /ˈsæfɑːr/, is an extrasolar planet approximately 44 light-years away from the Sun in the constellation of Andromeda.', 2245, 525);
INSERT INTO public.planet VALUES (11, 'Proxima Centauri b', 2, false, 'Proxima Centauri b is an exoplanet orbiting within the habitable zone of the red dwarf star Proxima Centauri, which is the closest star to the Sun and part of the larger triple star system Alpha Centauri.', 1.03, 7264);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 'Sun', 4, 1, true, 1);
INSERT INTO public.star VALUES (2, 'Proxima Centauri', 4, 0.15, true, 1);
INSERT INTO public.star VALUES (3, 'Sirius A', 4, 1.711, false, 1);
INSERT INTO public.star VALUES (4, 'Epsilon Eridani', 4, 0.735, true, 1);
INSERT INTO public.star VALUES (5, 'Alpharatz', 4, 2.94, false, 2);
INSERT INTO public.star VALUES (6, 'Mirach', 4, 86.4, false, 2);
INSERT INTO public.star VALUES (7, 'Upsilon Andromeda', 4, 1.27, true, 2);


--
-- Data for Name: star_type; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star_type VALUES (1, 3000, 'When a main sequence star less than eight times the Sun’s mass runs out of hydrogen in its core, it starts to collapse because the energy produced by fusion is the only force fighting gravity’s tendency to pull matter together. But squeezing the core also increases its temperature and pressure, so much so that its helium starts to fuse into carbon, which also releases energy. Hydrogen fusion begins moving into the star’s outer layers, causing them to expand. The result is a red giant, which would appear more orange than red. Eventually, the red giant becomes unstable and begins pulsating, periodically expanding and ejecting some of its atmosphere. Eventually, all of its outer layers blow away, creating an expanding cloud of dust and gas called a planetary nebula.', 'Red Giant');
INSERT INTO public.star_type VALUES (2, 0.5, 'After a red giant has shed all its atmosphere, only the core remains. Scientists call this kind of stellar remnant a white dwarf. A white dwarf is usually Earth-size but hundreds of thousands of times more massive. A teaspoon of its material would weigh more than a pickup truck. A white dwarf produces no new heat of its own, so it gradually cools over billions of years. Despite the name, white dwarfs can emit visible light that ranges from blue white to red. Scientists sometimes find that white dwarfs are surrounded by dusty disks of material, debris, and even planets – leftovers from the original star’s red giant phase.', 'White Dwarf');
INSERT INTO public.star_type VALUES (3, -10, 'A neutron star forms when a main sequence star with between about eight and 20 times the Sun’s mass runs out of hydrogen in its core. (Heavier stars produce stellar-mass black holes.) The star starts fusing helium to carbon, like lower-mass stars. But then, when the core runs out of helium, it shrinks, heats up, and starts converting its carbon into neon, which releases energy. This process continues as the star converts neon into oxygen, oxygen into silicon, and finally silicon into iron. These processes produce energy that keep the core from collapsing, but each new fuel buys it less and less time. By the time silicon fuses into iron, the star runs out of fuel in a matter of days. The next step would be fusing iron into some heavier element, but doing so requires energy instead of releasing it. The core collapses and then rebounds back to its original size, creating a shock wave that travels through the star’s outer layers. The result is a huge explosion called a supernova. The remnant core is a superdense neutron star.', 'Neutron');
INSERT INTO public.star_type VALUES (4, 1, 'A normal star forms from a clump of dust and gas in a stellar nursery. Over hundreds of thousands of years, the clump gains mass, starts to spin, and heats up. When the clumps core heats up to millions of degrees, nuclear fusion starts. This process occurs when two protons, the nuclei of hydrogen atoms, merge to form one helium nucleus. Fusion releases energy that heats the star, creating pressure that pushes against the force of its gravity. A star is born. Scientists call a star that is fusing hydrogen to helium in its core a main sequence star. Main sequence stars make up around 90% of the universe’s stellar population. They range in luminosity, color, and size – from a tenth to 200 times the Suns mass – and live for millions to billions of years.', 'Main Sequence');


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 6, true);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 21, true);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 13, true);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 7, true);


--
-- Name: star_type_star_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_type_star_type_id_seq', 4, true);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_name_key UNIQUE (name);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_name_key UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: star star_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_name_key UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: star_type star_type_description_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star_type
    ADD CONSTRAINT star_type_description_key UNIQUE (description);


--
-- Name: star_type star_type_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star_type
    ADD CONSTRAINT star_type_name_key UNIQUE (name);


--
-- Name: star_type star_type_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star_type
    ADD CONSTRAINT star_type_pkey PRIMARY KEY (star_type_id);


--
-- Name: galaxy unique_name; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT unique_name UNIQUE (name);


--
-- Name: planet unique_planet_name; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT unique_planet_name UNIQUE (name);


--
-- Name: star unique_star_name; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT unique_star_name UNIQUE (name);


--
-- Name: star fk_galaxy_id; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT fk_galaxy_id FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- Name: moon fk_planet_id; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT fk_planet_id FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet fk_star_id; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT fk_star_id FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--