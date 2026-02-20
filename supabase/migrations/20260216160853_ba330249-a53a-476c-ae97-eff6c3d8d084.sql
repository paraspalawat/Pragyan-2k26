
-- Create registrations table
CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  department TEXT,
  event_name TEXT NOT NULL,
  transaction_id TEXT NOT NULL,
  screenshot_url TEXT NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Unique constraint: one registration per phone + event
ALTER TABLE public.registrations ADD CONSTRAINT unique_phone_event UNIQUE (phone, event_name);

-- Enable RLS
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Anyone can insert registrations (anonymous)
CREATE POLICY "Anyone can register"
ON public.registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Anyone can count registrations (for event counts)
CREATE POLICY "Anyone can view registration counts"
ON public.registrations
FOR SELECT
TO anon, authenticated
USING (true);

-- Create storage bucket for payment screenshots
INSERT INTO storage.buckets (id, name, public) VALUES ('payments', 'payments', true);

-- Anyone can upload to payments bucket
CREATE POLICY "Anyone can upload payment screenshots"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'payments');

-- Anyone can view payment screenshots (public bucket)
CREATE POLICY "Anyone can view payment screenshots"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'payments');

-- Enable realtime for registrations
ALTER PUBLICATION supabase_realtime ADD TABLE public.registrations;
