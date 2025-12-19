-- Create table for property enquiries
CREATE TABLE public.property_enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  timeline TEXT NOT NULL,
  financing TEXT NOT NULL,
  purpose TEXT NOT NULL,
  decision_maker TEXT NOT NULL,
  activity TEXT NOT NULL,
  budget TEXT NOT NULL,
  site_visit TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.property_enquiries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert enquiries (public form)
CREATE POLICY "Anyone can submit enquiries" 
ON public.property_enquiries 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow anyone to view enquiries (for admin purposes later)
CREATE POLICY "Anyone can view enquiries" 
ON public.property_enquiries 
FOR SELECT 
USING (true);