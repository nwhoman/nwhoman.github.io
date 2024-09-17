11^Z
[17]+  Stopped                 ./salon.sh
camper: /project$ ./salon.sh

~~~~~ Salon Appointment Scheduler ~~~~~


Welcome to the online appointment scheduler, how may I help you?
1) Shampoo
2) Trim
3) Perm
4) Full Cut
5) Shave
6) Color
1
Please enter your phone number in the format (xxx-xxx-xxxx)
111-111-1111
111-111-1111
111-111-1111
You are not in our customer database. Please enter your full name to create an account.
^Z
[18]+  Stopped                 ./salon.sh
camper: /project$ ./salon.sh

~~~~~ Salon Appointment Scheduler ~~~~~


Welcome to the online appointment scheduler, how may I help you?
1) Shampoo
2) Trim
3) Perm
4) Full Cut
5) Shave
6) Color
1
Please enter your phone number in the format (xxx-xxx-xxxx)
111-111-1111
111-111-1111

You are not in our customer database. Please enter your full name to create an account.
^Z
[19]+  Stopped                 ./salon.sh
camper: /project$ echo "(123) -456-7890" | sed 's/(\([0-9]\{3\}\)) -\([0-9]\{3\}-[0-9]\{4\}\)/\1-\2/g' 
123-456-7890
123-456-7890
bash: 123-456-7890: command not found
camper: /project$ echo "(123) -456-7890" | sed 's/(\([0-9]\{3\}\)) -\([0-9]\{3\}-[0-9]\{4\}\)/\1-\2/g' 
123-456-7890
camper: /project$ echo "123-456-7890" | sed 's/-//g' 
1234567890
camper: /project$ ./salon.sh

~~~~~ Salon Appointment Scheduler ~~~~~


Welcome to the online appointment scheduler, how may I help you?
1) Shampoo
2) Trim
3) Perm
4) Full Cut
5) Shave
6) Color
1
Please enter your phone number in the format (xxx-xxx-xxxx)
111-111-1111
111-111-1111
1111111111
You are not in our customer database. Please enter your full name to create an account.
^Z
[20]+  Stopped                 ./salon.sh
camper: /project$ ./salon.sh

~~~~~ Salon Appointment Scheduler ~~~~~


Welcome to the online appointment scheduler, how may I help you?
1) Shampoo
2) Trim
3) Perm
4) Full Cut
5) Shave
6) Color
1
Please enter your phone number in the format (xxx-xxx-xxxx)
111-111-1111
111-111-1111
1111111111
You are not in our customer database. Please enter your full name to create an account.
wyatt
wyatt, what time do you want to be seen?
1
I have put you down for a  Shampoo at 1,  wyatt.
camper: /project$ ./salon.sh

~~~~~ Salon Appointment Scheduler ~~~~~


Welcome to the online appointment scheduler, how may I help you?
1) Shampoo
2) Trim
3) Perm
4) Full Cut
5) Shave
6) Color
1
Please enter your phone number in the format (xxx-xxx-xxxx)
111-111-1111
111-111-1111
1111111111
wyatt, what time do you want to be seen?
2
I have put you down for a Shampoo at 2, wyatt.
camper: /project$ ./salon.sh

~~~~~ Salon Appointment Scheduler ~~~~~


Welcome to the online appointment scheduler, how may I help you?
1) Shampoo
2) Trim
3) Perm
4) Full Cut
5) Shave
6) Color
2
Please enter your phone number in the format (xxx-xxx-xxxx)
503-363-7634
5033637634
You are not in our customer database. Please enter your full name to create an account.
old neal
old neal, what time do you want to be seen?
12pm
I have put you down for a Trim at 12pm, old neal.
camper: /project$ ./salon.sh

~~~~~ Salon Appointment Scheduler ~~~~~


Welcome to the online appointment scheduler, how may I help you?
1) Shampoo
2) Trim
3) Perm
4) Full Cut
5) Shave
6) Color
1
Please enter your phone number in the format (xxx-xxx-xxxx)
5555555
Test, what time do you want to be seen?
2am
I have put you down for a Shampoo at 2am, Test.
camper: /project$ ./salon.sh

~~~~~ Salon Appointment Scheduler ~~~~~


Welcome to the online appointment scheduler, how may I help you?
1) Shampoo
2) Trim
3) Perm
4) Full Cut
5) Shave
6) Color
1
Please enter your phone number in the format (xxx-xxx-xxxx)
222-222-2222
You are not in our customer database. Please enter your full name to create an account.
neal
neal, what time do you want to be seen?
2pm
I have put you down for a Shampoo at 2pm, neal.
camper: /project$ pg_dump -cC --inserts -U freecodecamp salon > salon.sql
camper: /project$ cat salon.sql
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

DROP DATABASE salon;
--
-- Name: salon; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE salon WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE salon OWNER TO freecodecamp;

\connect salon

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
-- Name: appointments; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.appointments (
    appointment_id integer NOT NULL,
    customer_id integer NOT NULL,
    service_id integer NOT NULL,
    "time" character varying(20)
);


ALTER TABLE public.appointments OWNER TO freecodecamp;

--
-- Name: asppointments_appointment_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.asppointments_appointment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.asppointments_appointment_id_seq OWNER TO freecodecamp;

--
-- Name: asppointments_appointment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.asppointments_appointment_id_seq OWNED BY public.appointments.appointment_id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.customers (
    customer_id integer NOT NULL,
    phone character varying(20) NOT NULL,
    name character varying(40) NOT NULL
);


ALTER TABLE public.customers OWNER TO freecodecamp;

--
-- Name: customers_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.customers_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customers_customer_id_seq OWNER TO freecodecamp;

--
-- Name: customers_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.customers_customer_id_seq OWNED BY public.customers.customer_id;


--
-- Name: services; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.services (
    service_id integer NOT NULL,
    name character varying(40) NOT NULL
);


ALTER TABLE public.services OWNER TO freecodecamp;

--
-- Name: services_service_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.services_service_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.services_service_id_seq OWNER TO freecodecamp;

--
-- Name: services_service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.services_service_id_seq OWNED BY public.services.service_id;


--
-- Name: appointments appointment_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.appointments ALTER COLUMN appointment_id SET DEFAULT nextval('public.asppointments_appointment_id_seq'::regclass);


--
-- Name: customers customer_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.customers ALTER COLUMN customer_id SET DEFAULT nextval('public.customers_customer_id_seq'::regclass);


--
-- Name: services service_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.services ALTER COLUMN service_id SET DEFAULT nextval('public.services_service_id_seq'::regclass);


--
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.appointments VALUES (47, 17, 1, 'Test');
INSERT INTO public.appointments VALUES (48, 17, 1, 'Test');
INSERT INTO public.appointments VALUES (49, 17, 1, 'Test');
INSERT INTO public.appointments VALUES (50, 17, 1, 'Test');
INSERT INTO public.appointments VALUES (52, 17, 1, 'Test');
INSERT INTO public.appointments VALUES (53, 19, 1, '2pm');


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.customers VALUES (1, '111', 'neal');
INSERT INTO public.customers VALUES (2, '-5000', 'Test');
INSERT INTO public.customers VALUES (8, '-5555', 'Fabio');
INSERT INTO public.customers VALUES (9, '-1111', 'homan');
INSERT INTO public.customers VALUES (16, '1111111111', 'wyatt');
INSERT INTO public.customers VALUES (17, '5555555', 'Test');
INSERT INTO public.customers VALUES (18, '5033637634', 'old neal');
INSERT INTO public.customers VALUES (19, '222-222-2222', 'neal');


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.services VALUES (1, 'Shampoo');
INSERT INTO public.services VALUES (2, 'Trim');
INSERT INTO public.services VALUES (3, 'Perm');
INSERT INTO public.services VALUES (4, 'Full Cut');
INSERT INTO public.services VALUES (5, 'Shave');
INSERT INTO public.services VALUES (6, 'Color');


--
-- Name: asppointments_appointment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.asppointments_appointment_id_seq', 59, true);


--
-- Name: customers_customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.customers_customer_id_seq', 24, true);


--
-- Name: services_service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.services_service_id_seq', 6, true);


--
-- Name: appointments asppointments_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT asppointments_pkey PRIMARY KEY (appointment_id);


--
-- Name: customers customers_phone_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_phone_key UNIQUE (phone);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (service_id);


--
-- Name: appointments appointments_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);


--
-- Name: appointments appointments_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(service_id);


--
-- PostgreSQL database dump complete
--

camper: /project$ 