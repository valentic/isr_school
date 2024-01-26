--
-- PostgreSQL database dump
--

-- Dumped from database version 12.13
-- Dumped by pg_dump version 12.13

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
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: transport
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO transport;

--
-- Name: blacklist_tokens; Type: TABLE; Schema: public; Owner: transport
--

CREATE TABLE public.blacklist_tokens (
    id integer NOT NULL,
    token character varying(500) NOT NULL,
    blacklisted_on timestamp without time zone NOT NULL
);


ALTER TABLE public.blacklist_tokens OWNER TO transport;

--
-- Name: blacklist_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: transport
--

CREATE SEQUENCE public.blacklist_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.blacklist_tokens_id_seq OWNER TO transport;

--
-- Name: blacklist_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: transport
--

ALTER SEQUENCE public.blacklist_tokens_id_seq OWNED BY public.blacklist_tokens.id;


--
-- Name: history; Type: TABLE; Schema: public; Owner: transport
--

CREATE TABLE public.history (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    action character varying(255) NOT NULL
);


ALTER TABLE public.history OWNER TO transport;

--
-- Name: history_id_seq; Type: SEQUENCE; Schema: public; Owner: transport
--

CREATE SEQUENCE public.history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.history_id_seq OWNER TO transport;

--
-- Name: history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: transport
--

ALTER SEQUENCE public.history_id_seq OWNED BY public.history.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: transport
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(50),
    description character varying(255)
);


ALTER TABLE public.roles OWNER TO transport;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: transport
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO transport;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: transport
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: transport
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    updated_on timestamp without time zone NOT NULL,
    pending boolean NOT NULL,
    active boolean NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.users OWNER TO transport;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: transport
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO transport;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: transport
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: blacklist_tokens id; Type: DEFAULT; Schema: public; Owner: transport
--

ALTER TABLE ONLY public.blacklist_tokens ALTER COLUMN id SET DEFAULT nextval('public.blacklist_tokens_id_seq'::regclass);


--
-- Name: history id; Type: DEFAULT; Schema: public; Owner: transport
--

ALTER TABLE ONLY public.history ALTER COLUMN id SET DEFAULT nextval('public.history_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: transport
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: transport
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: transport
--

COPY public.alembic_version (version_num) FROM stdin;
8b216619b1f2
\.


--
-- Data for Name: blacklist_tokens; Type: TABLE DATA; Schema: public; Owner: transport
--

COPY public.blacklist_tokens (id, token, blacklisted_on) FROM stdin;
\.


--
-- Data for Name: history; Type: TABLE DATA; Schema: public; Owner: transport
--

COPY public.history (id, username, "timestamp", action) FROM stdin;
1	system	2023-01-23 17:15:11.063151	Application received for Katelynn Greer
2	system	2023-01-23 19:57:48.293406	Application received for Nicholas Holl
3	system	2023-01-24 05:02:00.01001	Application received for Zishun Qiao
4	system	2023-01-26 02:04:53.882752	Application received for Elias Huaripuma Laveriano
5	system	2023-01-26 18:39:31.007273	Application received for Sowmya Lakshmi Muthurangan
6	system	2023-01-27 02:35:33.367343	Application received for Wellen Rukundo
7	system	2023-02-03 00:21:45.006916	Application received for Yu Hong
8	system	2023-02-03 17:04:02.931029	Application received for heba mohamed
9	system	2023-02-06 00:03:06.61813	Application received for Osanyin Taiwo
10	system	2023-02-17 19:18:30.568433	Application received for Subodh Dahal
11	system	2023-02-20 19:11:02.950756	Application received for Ayesha Saeed
12	system	2023-02-23 19:10:18.133065	Application received for Connor  Smith
13	system	2023-02-23 23:21:15.988456	Application received for Austin Smith
14	system	2023-02-28 08:32:08.936156	Application received for Abdalla Shaker ABDALLA
15	system	2023-02-28 17:46:07.305534	Application received for Diego  Penaloza
16	system	2023-03-04 01:53:55.75329	Application received for Shreejan  Khanal
17	system	2023-03-06 05:32:52.004768	Application received for Aklima Khatun
18	system	2023-03-07 03:33:08.796712	Application received for Jodie McLennan
19	system	2023-03-07 20:54:31.011146	Application received for Sophie Phillips
20	system	2023-03-08 01:16:51.132051	Application received for Jaewook Lee
21	system	2023-03-09 19:07:37.123149	Application received for Brendan Smithwick
22	system	2023-03-09 22:24:49.142702	Application received for Hayley Clevenger
23	system	2023-03-10 03:47:33.790149	Application received for Aaron Kirchman
24	system	2023-03-10 03:47:39.536302	Application received for Nancy Abraham
25	system	2023-03-10 05:07:16.506012	Application received for Maya Vaidya
26	system	2023-03-10 05:13:39.685923	Application received for Dibyendu Sur
27	system	2023-03-10 16:19:39.096906	Application received for Michelle Bui
28	system	2023-03-10 17:01:49.35157	Application received for Anastasia Brown
29	system	2023-03-15 20:40:11.458615	Application received for William Parker
30	system	2023-03-17 23:25:58.181054	Application received for Raymond Lau
31	system	2023-03-19 19:46:51.486917	Application received for Domenique Freund
32	system	2023-03-20 19:42:18.577049	Application received for Khilav Majmudar
33	system	2023-03-21 20:54:46.557207	Application received for Joaquin Diaz Pena
34	system	2023-03-22 18:13:48.475731	Application received for Jiawei Xu
35	system	2023-03-22 18:18:37.648385	Application received for Pin-Hsuan Cheng
36	system	2023-03-23 14:51:38.277904	Application received for Joan Conza
37	system	2023-03-23 23:35:21.503799	Application received for James Monaco
38	system	2023-03-24 19:07:52.924189	Application received for Meghan LeMay
39	system	2023-03-24 19:44:12.251389	Application received for Tanmay Das
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: transport
--

COPY public.roles (id, name, description) FROM stdin;
1	member	Read only access
2	manager	Update data
3	admin	Add/change/delete users
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: transport
--

COPY public.users (id, username, password_hash, email, created_on, updated_on, pending, active, role_id) FROM stdin;
9	sraizada	$2b$12$Yo/v1V7RCW.I2GwcA/1TNODl0I6ZVH68P6QyJBaxlwK8q.beOBHw.	shrai259@gmail.com	2022-04-15 00:03:31.221621	2022-04-15 00:03:31.221868	f	t	2
1	valentic	$2b$12$rR6xQMmqiqvFcdgGvPJ65.0aME51MuC6Ohl1Yv1vDg343Rp8wUMJ2	todd.valentic@sri.com	2022-03-25 16:30:16.728717	2022-03-25 16:30:16.728727	f	t	3
8	member	$2b$12$4zVdMRvgjRQmVZmXn/fIPuJlKoyQm/XJQeynnDtUpfjc5EN8yeNPW	isrschool2023@sri.com	2022-04-13 17:05:05.854838	2022-04-13 17:05:05.854856	f	t	1
2	preyes	$2b$12$Vg.X3/9eUEX0dhbKwcJ7kOlQ4fxv37LgG/GdpWJiRCdJqKi1n7XRm	pablo.reyes@sri.com	2022-03-25 17:20:10.589848	2022-03-25 17:20:10.589862	f	t	3
\.


--
-- Name: blacklist_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: transport
--

SELECT pg_catalog.setval('public.blacklist_tokens_id_seq', 1, false);


--
-- Name: history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: transport
--

SELECT pg_catalog.setval('public.history_id_seq', 39, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: transport
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: transport
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: transport
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: blacklist_tokens blacklist_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: transport
--

ALTER TABLE ONLY public.blacklist_tokens
    ADD CONSTRAINT blacklist_tokens_pkey PRIMARY KEY (id);


--
-- Name: blacklist_tokens blacklist_tokens_token_key; Type: CONSTRAINT; Schema: public; Owner: transport
--

ALTER TABLE ONLY public.blacklist_tokens
    ADD CONSTRAINT blacklist_tokens_token_key UNIQUE (token);


--
-- Name: history history_pkey; Type: CONSTRAINT; Schema: public; Owner: transport
--

ALTER TABLE ONLY public.history
    ADD CONSTRAINT history_pkey PRIMARY KEY (id);


--
-- Name: roles roles_name_key; Type: CONSTRAINT; Schema: public; Owner: transport
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: transport
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: transport
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_password_hash_key; Type: CONSTRAINT; Schema: public; Owner: transport
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_password_hash_key UNIQUE (password_hash);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: transport
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: transport
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: transport
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- PostgreSQL database dump complete
--

