import { onMounted, ref,computed } from "vue";


export default function useFixed(){
    const scrollY = ref(0)
    const divtopHeight = ref(0)
    const directionRef = ref(null)
    
    const onScroll1 = (pos)=>{
        scrollY.value = -pos.y
        
        // console.log(newdata.value)
    }





    function computedFn(){
        const height = directionRef.value.clientHeight
        divtopHeight.value = height
        // console.log(height)
       
    }

    const divtopStyle = computed(()=>{
        let zIndex = 0
        if(scrollY.value >= divtopHeight.value){
           zIndex = 10
            return{
               display:'block',
               zIndex
                // position:'fixed',
                
            }
        }
    })

    onMounted(()=>{
        computedFn()
    })
    return{
        onScroll1,
       
        directionRef,
        divtopStyle
    }
}