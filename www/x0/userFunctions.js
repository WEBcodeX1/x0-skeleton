//-------1---------2---------3---------4---------5---------6---------7--------//
//- Copyright WEB/codeX 2011 - 2022                                          -//
//-------1---------2---------3---------4---------5---------6---------7--------//
//-                                                                          -//
//-------1---------2---------3---------4---------5---------6---------7--------//
//- USER Functions                                                           -//
//-------1---------2---------3---------4---------5---------6---------7--------//
//- User based functions                                                     -//
//-                                                                          -//
//-                                                                          -//
//-------1---------2---------3---------4---------5---------6---------7--------//


//------------------------------------------------------------------------------
//- Function "calculateOffer"
//------------------------------------------------------------------------------

function calculateOffer(FactoryRef)
{
	const TourTableObj = FactoryRef.getObjectByID('CalculatorStep2ContentSendList');

	const PriceKGConsol = FactoryRef.getGlobalVar('PriceKGConsol');
	const VolumeDivisorConsol = FactoryRef.getGlobalVar('VolumeDivisorConsol');
	const MinEuroConsol = FactoryRef.getGlobalVar('MinEuroConsol');
	const MaxEuroConsol = FactoryRef.getGlobalVar('MaxEuroConsol');

	const PriceKGDirect = FactoryRef.getGlobalVar('PriceKGDirect');
	const VolumeDivisorDirect = FactoryRef.getGlobalVar('VolumeDivisorDirect');
	const MinEuroDirect = FactoryRef.getGlobalVar('MinEuroDirect');
	const MaxEuroDirect = FactoryRef.getGlobalVar('MaxEuroDirect');

	const TourTableData = TourTableObj.RuntimeGetDataFunc();

	console.debug('TourTableData:%o', TourTableData);
	console.debug('PriceKGConsol:%s PriceKGDirect:%s', PriceKGConsol, PriceKGDirect);

	const PriceConsol = calculatePriceConsol(
		PriceKGConsol,
		VolumeDivisorConsol,
		MinEuroConsol,
		MaxEuroConsol,
		TourTableData
	);

	const ResultDisplayObj1 = FactoryRef.getObjectByID('CalculatorStep4ContentPriceDirect');
	ResultDisplayObj1.ParentObject.Value = PriceConsol + ',00 €';
	ResultDisplayObj1.ParentObject.updateFormItemValue();

	const PriceDirect = calculatePriceDirect(
		PriceKGDirect,
		VolumeDivisorDirect,
		MinEuroDirect,
		MaxEuroDirect,
		TourTableData
	);

	const ResultDisplayObj2 = FactoryRef.getObjectByID('CalculatorStep4ContentPriceConsol');
	ResultDisplayObj2.ParentObject.Value = PriceDirect + ',00 €';
	ResultDisplayObj2.ParentObject.updateFormItemValue();
}


//------------------------------------------------------------------------------
//- Function "calculatePriceDirect"
//------------------------------------------------------------------------------

function calculatePriceDirect(PriceKG, VolumeDivisor, MinEuro, MaxEuro, TourTableData)
{
	console.debug('Type Direct. PriceKG:%s VolumeDivisor:%s MinEuro:%s MaxEuro:%s', PriceKG, VolumeDivisor, MinEuro, MaxEuro);

	var PriceDisplay = 0;

	var SumQubicMeter = 0;
	var SumWeight = 0;

	for (Index in TourTableData)
	{
		const TableRow = TourTableData[Index];
		const RowQubicMeter = parseInt(TableRow.ContentQubicMeters);
		const RowContentWeight = parseInt(TableRow.ContentWeight);

		SumQubicMeter += RowQubicMeter;
		SumWeight += RowContentWeight;
	}

	const VolumeWeight = (1000/VolumeDivisor)*SumQubicMeter;

	console.debug('SumQubicMeter:%s SumWeight:%s VolumeWeight:%s', SumQubicMeter, SumWeight, VolumeWeight);

	if (VolumeWeight > SumWeight) {
		PriceDisplay = MinEuro;
	}
	if (VolumeWeight < SumWeight) {
		PriceDisplay = (SumWeight*PriceKG);
	}

	return PriceDisplay;
}


//------------------------------------------------------------------------------
//- Function "calculatePriceConsol"
//------------------------------------------------------------------------------

function calculatePriceConsol(PriceKG, VolumeDivisor, MinEuro, MaxEuro, TourTableData)
{
	console.debug('Type Consol. PriceKG:%s VolumeDivisor:%s MinEuro:%s MaxEuro:%s', PriceKG, VolumeDivisor, MinEuro, MaxEuro);

	var Price = 0;

	var SumQubicMeter = 0;
	var SumWeight = 0;

	for (Index in TourTableData)
	{
		const TableRow = TourTableData[Index];
		const RowQubicMeter = parseInt(TableRow.ContentQubicMeters);
		const RowContentWeight = parseInt(TableRow.ContentWeight);

		const VolumeWeight = (1000/VolumeDivisor)*RowQubicMeter;

		console.debug('RowQubicMeter:%s RowWeight:%s VolumeWeight:%s', RowQubicMeter, RowContentWeight, VolumeWeight);

		if (VolumeWeight > RowContentWeight) {
			Price += MinEuro;
		}
		if (VolumeWeight < RowContentWeight) {
			Price += (RowContentWeight*PriceKG);
		}
	}

	return Price;
}
