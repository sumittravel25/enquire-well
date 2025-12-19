-- Add contact fields to property_enquiries table
ALTER TABLE public.property_enquiries 
ADD COLUMN name TEXT NOT NULL DEFAULT '',
ADD COLUMN email TEXT NOT NULL DEFAULT '',
ADD COLUMN mobile TEXT NOT NULL DEFAULT '';