import Head from "next/head";
import NavbarAdmin from "@/components/NavbarAdmin";
import styles from '../styles/admin1.module.css';
import Chart from 'chart.js/auto';
import React, { useEffect, useRef } from 'react';

export default function AdminDashboard() {
  const chartRef = useRef(null);

  useEffect(() => {
    const weeklySalesData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Weekly Sales',
          backgroundColor: '#56B280',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(86, 178, 128, 0.6)',
          data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        }
      ]
    };

    const weeklySalesOptions = {
      maintainAspectRatio: true, // ไม่รักษาอัตราส่วน
      layout: {
        padding: {
          left: 50, // ระยะขอบซ้ายของกราฟ
          right: 50, // ระยะขอบขวาของกราฟ
          top: 30, // ระยะขอบบนของกราฟ
          bottom: 30 // ระยะขอบล่างของกราฟ
        }

    },
    scales: {
        y: {
          ticks: {
            font: {
              size: 20 // ขนาดของ label ในแกน y
            }
          }
        },
        x: {
          ticks: {
            font: {
              size: 22 // ขนาดของ label ในแกน x
            }
          }
        }
    },
      barThickness: 50,
      categoryPercentage: 0.7, // ปรับความกว้างของแท่งเท่ากับข้อมูลทั้งหมด 70%
      barPercentage: 1.0,
      borderRadius: 6
    };

    const ctx = chartRef.current.getContext('2d');
    const chartInstance = new Chart(ctx, {
      type: 'bar',
      data: weeklySalesData,
      options: weeklySalesOptions
    });

    return () => {
      chartInstance.destroy();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <NavbarAdmin />

      <div className={styles.dashboardContainer}>
        <h1 className={styles.dashboard}>Dashboard</h1>

        <div className={styles.containerBox}>
          <div className={styles.box}>
            <div className={styles.text}>
              <h1 className={styles.numuser}>200</h1>
              <p className={styles.titleuser}>Total User</p>
            </div>
            <img src="/admin1/user.png" alt="user" width="40" height="40" />
          </div>

          <div className={styles.box}>
            <div className={styles.text}>
              <h2 className={styles.num}>THB 10,000</h2>
              <p className={styles.title}>Revenue</p>
            </div>
            <img src="/admin1/shopping-cart.png" alt="cart" width="40" height="40" />
          </div>
        </div>

        <h2 className={styles.weeksale}>Weekly Sales</h2>
        <div className={styles.containerChart}>
        <canvas id="weeklySalesChart" ref={chartRef} className={styles.chartCanvas}></canvas>
        </div>

      </div>
    </>
  );
}
