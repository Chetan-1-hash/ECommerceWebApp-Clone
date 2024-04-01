import { Component } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { DataTransferService } from '../../data-transfer.service';
import { feedbackData } from '../../mens/mens.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-data',
  standalone: true,
  imports: [CommonModule, FormsModule, CanvasJSAngularChartsModule],
  templateUrl: './admin-data.component.html',
  styleUrl: './admin-data.component.css'
})
export class AdminDataComponent {

  constructor(private df: DataTransferService) { }

  fData: feedbackData[] = [];

  ngOnInit() {
    this.df.value.subscribe(data => {
      this.fData = data;
    });
    // this.fData = [
    //   { fid: 1, term: 'positive', choice: "color" }, // Sample dummy data
    //   { fid: 2, term: 'positive', choice: "comfort" },
    //   { fid: 3, term: 'negative', choice: "durability" },
    //   { fid: 4, term: 'negative', choice: "size" },
    //   { fid: 5, term: 'negative', choice: "size" },
    //   { fid: 6, term: 'positive', choice: "comfort" },
    // ];
    console.log(this.fData);
    this.updateChartData();
  }

  chartOptions_barchart = {
    title: {
      text: "Feedback Choices"
    },
    animationEnabled: true,
    axisY: {
      includeZero: true
    },
    axisX: {
      title: "Choices",
      valueFormatString: "#", // Format x-axis values as integers
    },
    data: [{
      type: "column",
      indexLabelFontColor: "#5A5757",
      dataPoints: [] as { x: number; y: number; }[]
    }]
  }

  chartOptions_Pie = {
    animationEnabled: true,
    theme: "dark2",
    exportEnabled: true,
    title: {
      text: "Feedback Distribution"
    },
    // subtitles: [{
    //   text: "Median hours/week"
    // }],
    data: [{
      type: "pie", //change type to column, line, area, doughnut, etc
      indexLabel: "{name}: {y}%",
      dataPoints: [] as { name: string; y: number; }[] // Define type explicitly
    }]
  }

  chartOptions_Positive_barchart = {
    title: {
      text: "Positive Feedback Choices" // Add a title for the positive feedback bar chart
    },
    animationEnabled: true,
    axisY: {
      includeZero: true
    },
    axisX: {
      title: "Choices",
      valueFormatString: "#", // Format x-axis values as integers
    },
    data: [{
      type: "column",
      indexLabelFontColor: "#5A5757",
      dataPoints: [] as { x: number; y: number; label: string }[]
    }]
  }

  chartOptions_Negative_barchart = {
    title: {
      text: "Negative Feedback Choices" // Add a title for the negative feedback bar chart
    },
    animationEnabled: true,
    axisY: {
      includeZero: true
    },
    axisX: {
      title: "Choices",
      valueFormatString: "#", // Format x-axis values as integers
    },
    data: [{
      type: "column",
      indexLabelFontColor: "#5A5757",
      dataPoints: [] as { x: number; y: number; label: string }[]
    }]
  }




  choiceMapping: { [key: string]: number } = {
    'color': 1,
    'size': 2,
    'comfort': 3,
    'durability': 4,
    'style': 5
  };

  updateChartData() {
    this.BarChartMapping();
    this.PieChartMapping();
    this.PositiveBarchartMapping();
    this.NegativeBarchartMapping();
  }

  BarChartMapping() {
    // Initialize an object to store the counts for each choice
    const choiceCounts: { [key: string]: number } = {};

    // Count the occurrences of each choice
    this.fData.forEach(item => {
      const choice = item.choice.toLowerCase();
      choiceCounts[choice] = (choiceCounts[choice] || 0) + 1;
    });

    // Map the choice counts to bar chart data
    const barChartData = Object.keys(choiceCounts).map((choice, index) => ({
      x: index + 1, // Use index + 1 as the x value
      label: choice, // Store the choice label
      y: choiceCounts[choice] // Number of occurrences for the choice
    }));

    // Update bar chart data with the choice counts
    this.chartOptions_barchart.data[0].dataPoints = barChartData;
  }


  PieChartMapping() {
    // Count occurrences of positive and negative feedbacks
    let positiveCount = 0;
    let negativeCount = 0;

    this.fData.forEach(item => {
      if (item.term.toLowerCase() === 'positive') {
        positiveCount++;
      } else if (item.term.toLowerCase() === 'negative') {
        negativeCount++;
      }
    });

    // Update pie chart data with the counts
    this.chartOptions_Pie.data[0].dataPoints = [
      { name: 'Positive', y: positiveCount },
      { name: 'Negative', y: negativeCount }
    ];
  }

  PositiveBarchartMapping() {
    // const barChartData: { x: number; label: string; y: number; }[] = [];

    // Create an object to store the counts for each choice
    const choiceCounts: { [key: string]: number } = {};
    let id = 1; // Start with an initial identifier

    // Filter the feedback data for positive feedbacks
    const positiveFeedbacks = this.fData.filter(item => item.term.toLowerCase() === 'positive');

    // Count the occurrences of each choice and assign numeric identifiers
    positiveFeedbacks.forEach(item => {
      const choice = item.choice.toLowerCase();
      choiceCounts[choice] = (choiceCounts[choice] || 0) + 1;
    });
    const barChartData = Object.keys(choiceCounts).map((choice, index) => ({
      x: index + 1, // Use index + 1 as the x value
      label: choice, // Store the choice label
      y: choiceCounts[choice] // Number of occurrences for the choice
    }));

    this.chartOptions_Positive_barchart.data[0].dataPoints = barChartData;
  }

  NegativeBarchartMapping() {
    // Create an object to store the counts for each choice
    const choiceCounts: { [key: string]: number } = {};
    let id = 1; // Start with an initial identifier

    // Filter the feedback data for positive feedbacks
    const negativeFeedbacks = this.fData.filter(item => item.term.toLowerCase() === 'negative');

    // Count the occurrences of each choice and assign numeric identifiers
    negativeFeedbacks.forEach(item => {
      const choice = item.choice.toLowerCase();
      choiceCounts[choice] = (choiceCounts[choice] || 0) + 1;
    });

    // Map the choice counts to bar chart data
    const barChartData = Object.keys(choiceCounts).map((choice, index) => ({
      x: index + 1, // Use index + 1 as the x value
      label: choice, // Store the choice label
      y: choiceCounts[choice] // Number of occurrences for the choice
    }));

    this.chartOptions_Negative_barchart.data[0].dataPoints = barChartData;
  }

}
