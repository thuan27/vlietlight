import { Component, ViewEncapsulation } from '@angular/core';

import { AnalyticsDashboardService } from './analytics.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
	selector: 'fuse-analytics-dashboard',
	templateUrl: './analytics.component.html',
	styleUrls: [ './analytics.component.scss' ],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class FuseAnalyticsDashboardComponent {
	widgets: any;
	chartCustomer: string[] = [];
	widget1SelectedYear = '2016';
	widget5SelectedDay = 'today';
	searchCustomerForm: FormGroup;

	constructor(
		private analyticsDashboardService: AnalyticsDashboardService,
		private translationLoader: FuseTranslationLoaderService,
		private formBuilder: FormBuilder
	) {
		// Get the widgets from the service
		this.widgets = this.analyticsDashboardService.widgets;
		// Register the custom chart.js plugin
		this.registerCustomChartJSPlugin();
	}

	async ngOnInit() {
		await this.buildCustomerForm();
		this.getChartCustomers();
	}

	private buildCustomerForm() {
		const nowDate = new Date();
		this.searchCustomerForm = this.formBuilder.group({
			from_date: nowDate,
			to_date: nowDate
		});
	}

	/**
     * Register a custom plugin
     */
	registerCustomChartJSPlugin() {
		(<any>window).Chart.plugins.register({
			afterDatasetsDraw: function(chart, easing) {
				// Only activate the plugin if it's made available
				// in the options
				if (
					!chart.options.plugins.xLabelsOnTop ||
					(chart.options.plugins.xLabelsOnTop && chart.options.plugins.xLabelsOnTop.active === false)
				) {
					return;
				}

				// To only draw at the end of animation, check for easing === 1
				const ctx = chart.ctx;

				chart.data.datasets.forEach(function(dataset, i) {
					const meta = chart.getDatasetMeta(i);
					if (!meta.hidden) {
						meta.data.forEach(function(element, index) {
							// Draw the text in black, with the specified font
							ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
							const fontSize = 13;
							const fontStyle = 'normal';
							const fontFamily = 'Roboto, Helvetica Neue, Arial';
							ctx.font = (<any>window).Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

							// Just naively convert to string for now
							const dataString = dataset.data[index].toString() + 'k';

							// Make sure alignment settings are correct
							ctx.textAlign = 'center';
							ctx.textBaseline = 'middle';
							const padding = 15;
							const startY = 24;
							const position = element.tooltipPosition();
							ctx.fillText(dataString, position.x, startY);

							ctx.save();

							ctx.beginPath();
							ctx.setLineDash([ 5, 3 ]);
							ctx.moveTo(position.x, startY + padding);
							ctx.lineTo(position.x, position.y - padding);
							ctx.strokeStyle = 'rgba(255,255,255,0.12)';
							ctx.stroke();

							ctx.restore();
						});
					}
				});
			}
		});
	}

	getChartCustomers() {
		console.log(this.searchCustomerForm.value);
		this.analyticsDashboardService.getChartCustomers(this.searchCustomerForm.value).subscribe((response) => {
			this.chartCustomer = response['data'];
		});
	}
}
