import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yownstjdvwvejrpepjom.supabase.co';
const supabaseKey = 'sb_publishable_EPNJjvMfKgvh-U6CVTmPJA_lYkISrXj';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from('COLLEGE-BIN').select('*').limit(3);
  if (error) {
    fs.writeFileSync('test-output.json', JSON.stringify(error, null, 2));
  } else {
    fs.writeFileSync('test-output.json', JSON.stringify(data, null, 2));
  }
}

test();
