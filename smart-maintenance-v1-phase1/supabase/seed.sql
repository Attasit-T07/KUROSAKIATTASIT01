-- Synthetic demonstration values only. Run after schema migration in a separately approved Phase 2.
insert into public.machines(code,name,model,is_demo) values ('M01','Demo Conveyor','FX5U Simulator',true) on conflict(code) do nothing;
insert into public.machine_status(machine_id,mode,speed_ppm) select id,'RUN',70 from public.machines where code='M01';
insert into public.sensor_readings(machine_id,current_a,temperature_c) select id,3.8,42.0 from public.machines where code='M01';
insert into public.production_records(machine_id,planned_seconds,run_seconds,ideal_cycle_seconds,total_count,good_count) select id,3600,3300,0.8571,3500,3430 from public.machines where code='M01';
insert into public.alarms(machine_id,code,description,activated_at,cleared_at) select id,'SENSOR_TIMEOUT','Synthetic sample event',now()-interval '2 hours',now()-interval '1 hour 50 minutes' from public.machines where code='M01';
