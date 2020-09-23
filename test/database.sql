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

CREATE TABLE public."Invoice" (
    id integer NOT NULL,
    policy_id integer NOT NULL,
    amount_due numeric(10,2) NOT NULL,
    due_on date NOT NULL,
    created timestamp without time zone NOT NULL,
    updated timestamp without time zone NOT NULL
);

ALTER TABLE public."Invoice" OWNER TO postgres;

CREATE SEQUENCE public."Invoice_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Invoice_id_seq" OWNER TO postgres;

ALTER SEQUENCE public."Invoice_id_seq" OWNED BY public."Invoice".id;




CREATE TABLE public."Payment" (
    id integer NOT NULL,
    policy_id integer NOT NULL,
    payment_amount numeric(10,2) NOT NULL,
    created timestamp without time zone NOT NULL,
    updated timestamp without time zone NOT NULL
);

ALTER TABLE public."Payment" OWNER TO postgres;

CREATE SEQUENCE public."Payment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Payment_id_seq" OWNER TO postgres;

ALTER SEQUENCE public."Payment_id_seq" OWNED BY public."Payment".id;




CREATE TABLE public."Policy" (
    id integer NOT NULL,
    number character varying(20) NOT NULL,
    annual_premium numeric(10,2) NOT NULL,
    effective_date date NOT NULL,
    created timestamp without time zone NOT NULL,
    updated timestamp without time zone NOT NULL,
    states jsonb NOT NULL
);

ALTER TABLE public."Policy" OWNER TO postgres;

CREATE SEQUENCE public."Policy_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public."Policy_id_seq" OWNER TO postgres;

ALTER SEQUENCE public."Policy_id_seq" OWNED BY public."Policy".id;




ALTER TABLE ONLY public."Invoice" ALTER COLUMN id SET DEFAULT nextval('public."Invoice_id_seq"'::regclass);

ALTER TABLE ONLY public."Payment" ALTER COLUMN id SET DEFAULT nextval('public."Payment_id_seq"'::regclass);

ALTER TABLE ONLY public."Policy" ALTER COLUMN id SET DEFAULT nextval('public."Policy_id_seq"'::regclass);

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public."Policy"
    ADD CONSTRAINT "Policy_number_key" UNIQUE (number);

ALTER TABLE ONLY public."Policy"
    ADD CONSTRAINT "Policy_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_policy_id_fkey" FOREIGN KEY (policy_id) REFERENCES public."Policy"(id) ON DELETE CASCADE NOT VALID;

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_policy_id_fkey" FOREIGN KEY (policy_id) REFERENCES public."Policy"(id) ON DELETE CASCADE NOT VALID;
