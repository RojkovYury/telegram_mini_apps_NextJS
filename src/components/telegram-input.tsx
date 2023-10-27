'use client'

interface TelegramInputProps {
    id: string;
    colorId: string;
    title: string;
    icon: any;  //!!!!!!!!!
    placeholder?: string;
    sx?: any;  //!!!!!!!!!
  }

export default function TelegramInput(props: TelegramInputProps) { 
    return(
      <div 
        style={{ 
          width: '100%', 
          paddingBottom: '16px', 
          ...props.sx
        }}
      >
        <div 
          style={{ 
            paddingLeft: '20px', 
            marginBottom: '4px', 
            fontSize: '16px', 
            color: 'var(--tg-theme-text-color)' 
          }}
        >
          {props.title}
        </div> 
        <div
          id={props.colorId}
          style={{ 
            display: 'flex',
            border: '2px solid var(--tg-theme-button-color)',
            borderRadius: '25px', 
          }}
        >
          <div
            style={{ 
              width: '24px', 
              height: '24px', 
              marginTop: '10px', 
              marginBottom: '10px', 
              marginLeft: '20px', 
              marginRight: '10px',
            }}
          >
            {props.icon}
          </div>
          <input
            id={props.id}
            placeholder={props.placeholder}
            // value={props.value}
            // onChange={props.onChange}
            style={{
              color: 'var(--tg-theme-text-color)',
              borderTopRightRadius: '25px',
              borderBottomRightRadius: '25px',
              backgroundColor: 'inherit',
              width: '100%',
              paddingTop: '10px',
              paddingBottom: '10px',
              paddingRight: '10px',
              border: 'none',
              outline: 'none',
              fontSize: '18px',
            }}
          />
        </div>
      </div>
    )
  }