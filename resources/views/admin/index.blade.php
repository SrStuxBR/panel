<?php
$db_host = env('DB_HOST', false);
$db_user = env('DB_USERNAME', false);
$db_pass = env('DB_PASSWORD', false);
$db_base = env('DB_DATABASE', false);

function throw_ex($er){  
  throw new Exception($er);  
}  
try {
	$link = mysqli_connect($db_host,$db_user,$db_pass,$db_base);
	$res = mysqli_query($link,"SELECT COUNT(*) FROM servers");
	$row = mysqli_fetch_row($res);
	$servers = $row[0];
	$res = mysqli_query($link,"SELECT COUNT(*) FROM users");
	$row = mysqli_fetch_row($res);
	$users = $row[0];
	
	$i = 0;
	while ($i < 7) {
		$date = date('Y-m-d');
		$date = date('Y-m-d', strtotime($date. " - ".$i." day"));
		$res = mysqli_query($link,"SELECT COUNT(*) FROM `users` WHERE `created_at` <= '".$date." 23:59:59' AND `created_at` >= '".$date." 0:00:01'");
		$row = mysqli_fetch_row($res);
		$stats_s[$i] = $row[0];
		$i++;
	}
} catch (exception $e) {
	$show_graphics = false;
	$stats[6] = 0; $stats[5] = 0; $stats[4] = 0; $stats[3] = 0; $stats[2] = 0; $stats[2] = 0; $stats[1] = 0; $stats[0] = 0;
	$stats_s[6] = 0; $stats_s[5] = 0; $stats_s[4] = 0; $stats_s[3] = 0; $stats_s[2] = 0; $stats_S[2] = 0; $stats_s[1] = 0; $stats_s[0] = 0;
	$servers = 0; $users = 0;
}
?>

{{-- Pterodactyl - Panel --}}
{{-- Copyright (c) 2015 - 2017 Dane Everitt <dane@daneeveritt.com> --}}

{{-- This software is licensed under the terms of the MIT license. --}}
{{-- https://opensource.org/licenses/MIT --}}
@extends('layouts.admin')

@section('title')
    Administration
@endsection

@section('content-header')
    <h1>Administrative Overview<small>A quick glance at your system.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li class="active">Index</li>
    </ol>
@endsection

@section('content')
<div class="row">
    <div class="col-xs-12">
        <div class="box
            @if($version->isLatestPanel())
                box-success
            @else
                box-danger
            @endif
        ">
            <div class="box-header with-border">
                <h3 class="box-title">System Information</h3>
            </div>
            <div class="box-body">
                @if ($version->isLatestPanel())
                    You are running Pterodactyl Panel version <code>{{ config('app.version') }}</code>. Your panel is up-to-date!
                @else
                    Your panel is <strong>not up-to-date!</strong> The latest version is <a href="https://github.com/Pterodactyl/Panel/releases/v{{ $version->getPanel() }}" target="_blank"><code>{{ $version->getPanel() }}</code></a> and you are currently running version <code>{{ config('app.version') }}</code>.
                @endif
            </div>
        </div>
    </div>
</div>
<div style="height:340px;" class="box box_1">
	<h4>New users</h4>
	<canvas id="chart_1"></canvas>
</div>
<div style="float:right;text-align:center;" class="box_2">
	<div class="box zoom">
		<h2 style="display:flex;align-items:center;"><?php echo $users; ?><small style="padding-left:15px;">All users</small></h2>
	</div>
	<div class="box zoom">
		<h2 style="display:flex;align-items:center;"><?php echo $servers; ?><small style="padding-left:15px;">All servers</small></h2>
	</div>
	<div class="box zoom">
		<h2 style="display:flex;align-items:center;"><?php echo $stats_s[0]; ?><small style="padding-left:15px;">Users today</small></h2>
	</div>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js@3.5.1/dist/chart.min.js"></script>
<script>
var ctx = document.getElementById("chart_1").getContext("2d");
var gradient = ctx.createLinearGradient(0, 0, 0, 250);
gradient.addColorStop(0, 'rgba(140,74,242,0.6)');
gradient.addColorStop(1, 'rgba(140,74,242,0)');

new Chart(document.getElementById("chart_1"), {
		type: 'line',
		data: {
		  labels: ["", "", "", "", ""],
		  datasets: [
			{
				label: "",
				fill: true,
				backgroundColor: gradient,
				borderColor: "rgb(140,74,242)",
				pointBorderColor: "#fff",
				pointBackgroundColor: "rgb(72,100,198)",
				pointBorderColor: "#fff",
				data: [<?php echo $stats_s[6]; ?>,<?php echo $stats_s[5]; ?>,<?php echo $stats_s[4]; ?>,<?php echo $stats_s[3]; ?>,<?php echo $stats_s[2]; ?>,<?php echo $stats_s[1]; ?>,<?php echo $stats_s[0]; ?>],
				tension: 0.5
			}
		  ]
		},
		
		options: {
			responsive: true,
			plugins: {
				legend: false,
			},
			scales: {
				yAxes: [{
					display: true,
					ticks: {
						suggestedMin: 0,
						suggestedMax: 1000
					}
				}],
				xAxes: [{
					display:false,
					ticks: {
						display: false
					}
				}]
			}
		}
	});
</script>

@endsection
