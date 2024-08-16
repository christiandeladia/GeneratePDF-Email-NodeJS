// raw file of script from index.html
        const jsonData = {
            "results": {
                "solarPanels": {
                    "count": 20,
                    "watts": 300,
                    "sqm": 40.56
                },
                "systemEstimates": {
                    "monthlyIncome": 5000.00,
                    "monthlyGeneration": 1200,
                    "twentyFiveYearForecast": {
                        "sunlightHours": 5.5,
                        "electricityRateIncrease": 0.05,
                        "degradationRate": 0.01,
                        "exportEnergyPercentage": 0.75,
                        "forecast": [
                            {
                                "year": 1,
                                "solarGeneration": 14400,
                                "electricityRate": 10.5,
                                "netMeteringRate": 5.25,
                                "annualSavings": 10000,
                                "returnOnInvestment": 5000
                            },
                            {
                                "year": 2,
                                "solarGeneration": 14256,
                                "electricityRate": 11.0,
                                "netMeteringRate": 5.50,
                                "annualSavings": 10500,
                                "returnOnInvestment": 5250
                            }
                        ]
                    }
                },
                "pricing": {
                    "total": 300000
                },
                "utility": {
                    "utilityRate": 10.5,
                    "kWhPerMonth": 1500
                },
                "environment": {
                    "savingsCO2ePerMonth": 0.45,
                    "matureTrees": 20,
                    "gasolineCarKM": 1500
                }
            },
            "tempUserData": {
                "monthlyBill": 8000.00
            }
        };

        function displayJSON() {
            const jsonDisplay = document.getElementById('jsonDisplay');
            jsonDisplay.textContent = JSON.stringify(jsonData, null, 4);
        }

        async function generateAndSendPDF() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            doc.setFontSize(16);
            doc.text("Solar Panel System Report", 10, 10);

            doc.setFontSize(12);
            doc.text(Panels: ${jsonData.results.solarPanels.count} x ${jsonData.results.solarPanels.watts}W, 10, 20);
            doc.text(Area Covered: ${jsonData.results.solarPanels.sqm} m², 10, 30);
            doc.text(Estimated Monthly Income: ₱${jsonData.results.systemEstimates.monthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}, 10, 40);
            doc.text(Monthly Generation: ${jsonData.results.systemEstimates.monthlyGeneration} kWh, 10, 50);

            doc.text("25-Year Forecast", 10, 60);
            jsonData.results.systemEstimates.twentyFiveYearForecast.forecast.forEach((item, index) => {
                const yOffset = 70 + index * 10;
                doc.text(Year ${item.year}: ROI = ₱${item.returnOnInvestment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}, 10, yOffset);
            });

            doc.text(Total System Cost: ₱${jsonData.results.pricing.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}, 10, 100);

            // Convert PDF to Blob
            const pdfBlob = doc.output('blob');

            // Send PDF to server
            const formData = new FormData();
            formData.append('pdf', pdfBlob, 'solar_report.pdf');

            try {
                const response = await fetch('http://localhost:3000/send-email', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    alert('PDF sent successfully!');
                } else {
                    alert('Failed to send PDF.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error sending PDF.');
            }
        }

        window.onload = displayJSON;
