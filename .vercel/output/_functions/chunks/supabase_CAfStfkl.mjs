import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://tuuuxxfvasbtffoyzent.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1dXV4eGZ2YXNidGZmb3l6ZW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxNDY1NTEsImV4cCI6MjA1NDcyMjU1MX0.hY3JMZhVn-eUE01U5t8aBTIARn7yqXJzdZxGlu2qAug"
);

export { supabase as s };
