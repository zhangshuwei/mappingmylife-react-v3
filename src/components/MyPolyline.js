// import { Polyline } from 'react-leaflet'
// import L from 'leaflet'
// import 'leaflet-polylinedecorator'
//
// class MyPolyline extends Polyline {
//   createLeafletElement(props: Object): Object {
//     const { positions, ...options } = props
//     let polyline = new L.polyline(positions,{color: "#808080",weight: 2,opacity: 1,smoothFactor: 1})
//     let decorator = L.polylineDecorator(polyline)
//     let arrowOffset = 0
//     let anim = setInterval(function() {
//         decorator.setPatterns([
//             {offset: arrowOffset+'%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 13, polygon: false, pathOptions: {stroke: true, color: "#449d44"}})}
//         ]);
//         if(++arrowOffset > 100){
//             arrowOffset = 0;
//         }
//     }, 200)
//     return polyline
//   }
//   // updateLeafletElement(fromProps: Object, toProps: Object) {
//   //   if (toProps.positions !== fromProps.positions) {
//   //     this.leafletElement.setLatLngs(toProps.positions)
//   //   }
//   //   this.setStyleIfChanged(fromProps, toProps)
//   // }
// }
// export default MyPolyline
